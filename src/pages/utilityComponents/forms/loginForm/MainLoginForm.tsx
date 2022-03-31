import { User } from "realm-web";
import GoogleBtn from "../../googleAuthBtn/GoogleAuthBtn"
import FormLogo from "../FormLogo"
//first page of login form
interface MainLoginFormProps{
    signInErr: { err: boolean, message: JSX.Element }
    onSignInSuccess: (user: User) => void,
    onSignInError: () => void,
    setGuestLogin: (e: boolean) => void
}
const MainLoginForm = ({
    signInErr,
    onSignInError,
    onSignInSuccess,
    setGuestLogin
}: MainLoginFormProps): JSX.Element => {
    return (
      <div className="login-form-container">
        {signInErr.err && (
          <div className="alert alert-danger login-pg-err-banner">
            {signInErr.message}
          </div>
        )}
        <FormLogo />
        <h1 className="login-form-title">Log in to your account</h1>
        <div className="login-form-google-auth">
          <GoogleBtn
            btnType={"signin"}
            customSuccessCallback={onSignInSuccess}
            customErrorFunc={onSignInError}
            customData={null}
          />
        </div>

        <div className="login-pg-hr-line">
          <div></div>
          <span>or</span>
          <div></div>
        </div>

        <button
          className="login-form-guest-btn"
          aria-label="open-guest-login-form"
          onClick={() => setGuestLogin(true)}
        >
          Continue As Guest
        </button>
      </div>
    );
}
export default MainLoginForm