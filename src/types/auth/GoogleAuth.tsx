
import { ErrorResponseData, SuccessResponseData } from "../generics/CustomHTTPTypes";
import { UserSignUpData } from "./UserAuthData";

export default UserSignUpData;
interface GoogleSignUp {
  btnType: "signup";
  customData: UserSignUpData;
  customSuccessCallback: null | ((e: Event | ErrorResponseData) => void);
  customErrorFunc: (e: Error | ErrorResponseData) => void;
}
type GoogleLogin = Pick<
  GoogleSignUp,
  "customSuccessCallback" | "customErrorFunc"
> & { btnType: "signin"; customData: null };
interface GoogleCredientals {
  clientId: string;
  credential: string;
}

interface CustomMongoHTTPSError {
  data: ErrorResponseData,
  status: string
  header: Object,
  config: Object,
  request: Object
}
type GoogleSignUpPostResponse = CustomMongoHTTPSError | Exclude<keyof CustomMongoHTTPSError, "data"> & { data: SuccessResponseData }
export type {
  GoogleSignUp,
  GoogleLogin,
  GoogleCredientals,
  GoogleSignUpPostResponse,
  CustomMongoHTTPSError,
};