import * as Realm from "realm-web";
import { UserSignUpData } from "../../../types";
import { GoogleCredientals } from "../../../types/auth/GoogleAuth";
export const googleSignUp = async ({
  res,
  app,
  customErrorFunc,
  customData,
}: {
  res: GoogleCredientals;
  app: any;
  customErrorFunc: (e: Error) => void;
  customData: UserSignUpData | null;
  }) => {
  console.log(res, app, customErrorFunc, customData)
    try {
      const payload = {
        custom_data: customData,
        token: res,
      };
      
      //      const credentials = Realm.Credentials.google(res.credential);
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
    } catch (err) {
      console.error(err);
      if (customErrorFunc && err instanceof Error) customErrorFunc(err);
    }
};
