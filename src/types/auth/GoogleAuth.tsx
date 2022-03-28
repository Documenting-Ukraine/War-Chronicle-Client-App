
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

export type {GoogleSignUp, GoogleLogin}