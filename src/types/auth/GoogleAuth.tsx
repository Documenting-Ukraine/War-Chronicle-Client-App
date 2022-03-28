
import { UserSignUpData } from "./UserAuthData";
export default UserSignUpData;
interface GoogleSignUp {
  btnType: "signup";
  customData: UserSignUpData;
  customSuccessCallback: null | ((e: Event) => void);
  customErrorFunc: (e: Error) => void;
}
type GoogleLogin = Pick<
  GoogleSignUp,
  "customSuccessCallback" | "customErrorFunc"
> & { btnType: "signin"; customData: null };
interface GoogleCredientals {
  clientId: string;
  credential: string;
}
export type {GoogleSignUp, GoogleLogin, GoogleCredientals}