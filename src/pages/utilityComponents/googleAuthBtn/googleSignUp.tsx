import * as Realm from "realm-web";
import { UserSignUpData } from "../../../types";
import { GoogleCredientals, GoogleSignUpPostResponse, ErrorResponseData } from "../../../types/";
import axios from "axios";

export const googleSignUp = async ({
  res,
  app,
  customErrorFunc,
  customData,
}: {
  res: GoogleCredientals;
  app: any;
  customErrorFunc: (e: Error | ErrorResponseData) => void;
  customData: UserSignUpData | null;
}) => {
  console.log(res, app, customErrorFunc, customData);
  try {
    const payload = {
      custom_data: customData,
      token: res,
    };
    const endpoint = `${process.env.MONGO_HTTP_ENDPOINT}validate_invite_links?${process.env.HTTP_ENDPOINTS_SECRET}`
    const result: GoogleSignUpPostResponse = await axios.post(endpoint ? endpoint : "", payload);
    if (result.data.error) customErrorFunc(result.data);

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
