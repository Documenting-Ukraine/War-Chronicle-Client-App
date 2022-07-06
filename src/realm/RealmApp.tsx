import { createContext, useContext, useState, useEffect } from "react";
import * as Realm from "realm-web";
import { unstable_batchedUpdates } from "react-dom";
type ErrorCallBack = (e: Realm.MongoDBRealmError) => any;
export type AWSCredentialsObj = {
  awsUserPoolToken: {
    AccessToken: string;
    ExpiresIn: number;
    IdToken: string;
    RefreshToken: string;
    TokenType: string;
  };
  awsIdentityCredentials: {
    Credentials: {
      AccessKeyId: string;
      Expiration: string | Date;
      SecretKey: string;
      SessionToken: string;
    };
    IdentityId: string;
  };
} | null;
export const isAWSCreds = (e: any): e is AWSCredentialsObj => {
  try {
    const userPool = e.awsUserPoolToken;
    const identity = e.awsIdentityCredentials;
    const allUserPoolProps =
      userPool.AccessToken &&
      userPool.ExpiresIn &&
      userPool.IdToken &&
      userPool.RefreshToken &&
      userPool.TokenType;
    const allIdentityProps = identity.Credentials && identity.IdentityId;
    return allUserPoolProps && allIdentityProps;
  } catch (a) {
    return false;
  }
};
export interface RealmApp {
  app: Realm.App;
  currentUser: Realm.User | null;
  logIn: (
    cred: Realm.Credentials,
    errCall: ErrorCallBack
  ) => Promise<Realm.User | null>;
  logOut: () => Promise<void>;
  userLoading: boolean;
  awsCredentials: null | AWSCredentialsObj;
  getAWSCredentials: (
    user: Realm.User,
    credentials: string | null
  ) => Promise<AWSCredentialsObj | null>;
}
const RealmAppContext = createContext<RealmApp | null>(null);

export const useRealmApp = () => {
  const app = useContext(RealmAppContext);
  if (!app) {
    throw new Error(
      `You must call useRealmApp() inside of a <RealmAppProvider />`
    );
  }
  return app;
};

export const RealmAppProvider = ({
  children,
  appId,
}: {
  children: JSX.Element;
  appId: string | undefined;
}) => {
  const [app, setApp] = useState(
    appId ? new Realm.App(appId) : new Realm.App("")
  );
  useEffect(() => {
    setApp(new Realm.App(appId ? appId : ""));
  }, [appId]);
  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = useState(app.currentUser);
  //to give feedback while a user is being authenticated
  const [userLoading, setUserLoading] = useState(false);
  const [awsCredentials, setAwsCreds] = useState<AWSCredentialsObj>(
    null
  );
  useEffect(() => {
    if (currentUser && !awsCredentials) {
      getAWSCredentials(currentUser, currentUser?.accessToken)
        .then((payload) => setAwsCreds(payload))
        .catch((e) => console.error(e));
    }
  }, [currentUser, awsCredentials]);

  const getAWSCredentials = async (
    user: Realm.User,
    realmAccessToken: string | null
  ) => {
    try {
      const awsCreds = await user?.callFunction(
        "user_aws_auth",
        realmAccessToken
      );
      if (isAWSCreds(awsCreds)) {
        setAwsCreds(awsCreds);
        return awsCreds;
      } else return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  async function logIn(
    credentials: Realm.Credentials,
    errorCallBack: (e: Realm.MongoDBRealmError) => void
  ) {
    try {
      setUserLoading(true);
      const user = await app.logIn(credentials);
      const awsCreds = await getAWSCredentials(user, user?.accessToken);
      // If successful, app.currentUser is the user that just logged in
      unstable_batchedUpdates(() => {
        setCurrentUser(app.currentUser);
        setUserLoading(false);
        setAwsCreds(awsCreds);
      });
      return app.currentUser;
    } catch (e) {
      setCurrentUser(null);
      if (e instanceof Realm.MongoDBRealmError) {
        console.error(e);
        if (errorCallBack) errorCallBack(e);
        unstable_batchedUpdates(() => {
          setCurrentUser(null);
          setUserLoading(false);
        });
      }
      return null;
    }
  }
  async function logOut() {
    // Log out the currently active user
    await app.currentUser?.logOut();
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    setCurrentUser(app.currentUser);
  }
  const wrapped: RealmApp = {
    app,
    currentUser,
    logIn,
    logOut,
    userLoading,
    awsCredentials,
    getAWSCredentials,
  };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
