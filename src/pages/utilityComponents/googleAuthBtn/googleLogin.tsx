import * as Realm from "realm-web";
import { UserSignUpData } from "../../../types";
export const googleLogin = async ({
  res,
  app,
  customErrorFunc,
  customData,
}: {
  res: Response;
  app: any;
  customErrorFunc: (e: Error) => void;
  customData: UserSignUpData | null;
}) => {
  //   try {
  //     const credentials = Realm.Credentials.google(res.credential);
  //     const payload = {
  //       custom_data: customData,
  //       token: res.credential,
  //     };
  //     const currentUser = await app.logIn(credentials, customErrorFunc);
  //     const functionName = "user_google_auth";
  //     //check if new user and create approriate data template for them
  //     const newUser = await currentUser.callFunction(functionName, payload);
  //     if (newUser.error) {
  //       currentUser.logOut();
  //       console.error(newUser.err);
  //       customErrorFunc(newUser.err);
  //     }
  //     return currentUser;
  //   } catch (err) {
  //     console.error(err);
  //     if (customErrorFunc) customErrorFunc(err);
  //   }
};
