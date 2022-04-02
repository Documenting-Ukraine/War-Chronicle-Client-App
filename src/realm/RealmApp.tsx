import { createContext, useContext, useState, useEffect } from "react";
import * as Realm from "realm-web";
import { unstable_batchedUpdates } from "react-dom";
type ErrorCallBack = (e: Realm.MongoDBRealmError) => any
export interface RealmApp {
  app: Realm.App,
  currentUser: Realm.User | null,
  logIn: (cred: Realm.Credentials, errCall: ErrorCallBack) => Promise<Realm.User | null>,
  logOut: () => Promise<void>,
  userLoading: boolean
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
    console.log(app)
  useEffect(() => {
    setApp(new Realm.App(appId ? appId : ""));
  }, [appId]);
  //const dispatch = useDispatch()
  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = useState(app.currentUser);
  //to give feedback while a user is being authenticated
  const [userLoading, setUserLoading] = useState(false);
  async function logIn(
    credentials: Realm.Credentials,
    errorCallBack: (e: Realm.MongoDBRealmError) => void
  ) {
    try {
      setUserLoading(true);
      await app.logIn(credentials);
      // If successful, app.currentUser is the user that just logged in
      unstable_batchedUpdates(() => {
        setCurrentUser(app.currentUser);
        setUserLoading(false);
      });
      return app.currentUser;
    } catch (e) {
      setCurrentUser(null);
      if (e instanceof Realm.MongoDBRealmError) {
        console.error(e);
        if (errorCallBack) errorCallBack(e);
      }
      return null
    }
  }
  async function logOut() {
    // Log out the currently active user
    await app.currentUser?.logOut();
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    setCurrentUser(null);
  }
  const wrapped: RealmApp = {
    app, currentUser, logIn, logOut, userLoading
  };
  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
