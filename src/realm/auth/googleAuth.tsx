import * as Realm from "realm-web";
import { UserSignUpData } from "../../types";
import { GoogleCredientals, ErrorResponseData } from "../../types";
import { RealmApp } from "../RealmApp";
export const googleAuth = async({
  res,
  app,
  customErrorFunc,
  customSuccessCallback,
  customData,
  auth_type,
}: {
    res: GoogleCredientals;
    app: RealmApp;
    customErrorFunc: (e: Error | ErrorResponseData) => void;
    customSuccessCallback?: (e: Realm.User) => void;
    customData: UserSignUpData | null;
    auth_type: "signup" | "signin";
  }) => {
  if (app.currentUser) await app.logOut();

  const payload = {
    custom_data: customData,
    token: res,
    auth_type: auth_type,
  };
  //login user using google info
  const credentials = Realm.Credentials.function(payload);
  let currentUser
  try {
    currentUser = await app.logIn(credentials, customErrorFunc);
    if (currentUser instanceof Realm.User && customSuccessCallback)
      customSuccessCallback(currentUser);
    return currentUser;
  } catch (e) {
    //make current user null again as 
    //Realm auto generates an id regardless 
    //(no user is made though)
    console.error(e)
    if (e instanceof Realm.MongoDBRealmError) customErrorFunc(e)
    return null
  }
};
