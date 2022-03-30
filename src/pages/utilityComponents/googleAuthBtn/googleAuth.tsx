import * as Realm from "realm-web";
import { UserSignUpData } from "../../../types";
import { GoogleCredientals, ErrorResponseData } from "../../../types";

export const googleAuth = async ({
  res,
  app,
  customErrorFunc,
  customData,
  auth_type,
}: {
  res: GoogleCredientals;
  app: any;
  customErrorFunc: (e: Error | ErrorResponseData) => void;
  customData: UserSignUpData | null;
  auth_type: "signup" | "signin";
}) => {
  const payload = {
    custom_data: customData,
    token: res,
    auth_type: auth_type,
  };
  //login user using google info
  const credentials = Realm.Credentials.function(payload);
  const currentUser = await app.logIn(credentials, customErrorFunc);
  return currentUser;
};
