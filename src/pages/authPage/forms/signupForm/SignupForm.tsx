import { useState, useEffect} from "react";
import GoogleBtn from "../../../utilityComponents/googleAuthBtn/GoogleAuthBtn";
import PlaceHolderGoogle from "../../../utilityComponents/googleAuthBtn/PlaceholderGoogle";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User } from "realm-web";
import { useParams } from "react-router-dom";
import FormErrBanner from "../../../utilityComponents/formErrBanner/FormErrBanner";
import { occupationData } from "../../data/OccupationList";
import Select from "react-select";
import validatePhoneNums from "../../../../helperFunctions/validatePhoneNum";
import useFormInputs from "../../../../hooks/use-form-inputs";
interface DefaultInputs {
  name: string;
  required: boolean;
  err: {err: boolean, message: string}
  children: JSX.Element
}
const SignUpFormInput = ({
  name,
  required,
  err,
  children
}: DefaultInputs): JSX.Element => {
  return (
    <div className="invite-link-input">
      <div className="input-heading">
        <h2>{name}</h2>
        <span>{required ? "*" : ""}</span>
      </div>
      {children}
      {err.err && <div className="err-message">{err.message}</div>}
    </div>
  );
}
const SignUpForm = (): JSX.Element => {
  const params = useParams();
  const inviteId = params.id;
  const [confirmCred, setConfirmCred] = useState(false);
  const [signupErr, setSignupErr] = useState({ err: false, message: "" });
  const {
    value: occupation,
    err: occErr,
    onTouch: onOccTouch,
    onDropdownChange: onOccChange,
  } = useFormInputs({required: true});
  const {
    value: phoneNum,
    err: phoneErr,
    onDefaultChange: onPhoneChange,
    onTouch: onPhoneTouch,
  } = useFormInputs({ validateFunc: validatePhoneNums });
  const navigate = useNavigate();
  //handle sign in with google button status
  useEffect(() => {
    if (occupation === "" && confirmCred) setConfirmCred(false);
    if (occupation !== "" && !confirmCred) setConfirmCred(true);
  }, [occupation, confirmCred]);

  const onSignUpError = () => {
    setSignupErr({
      err: true,
      message: `We could not sign you up. Please contact ${process.env.REACT_APP_SUPPORT_EMAIL} for more information`,
    });
  };
  const onSignUpSuccess = (user: User) => {
    //navigate to user dashboard
    navigate(`/dashboard/${user.id}`);
  };
  const customData = {
    occupation: occupation,
    phoneNumber: phoneNum,
    inviteId: inviteId ? inviteId : "",
  };
  return (
    <form className="invite-link-form">
      {signupErr.err && (
        <FormErrBanner formErr={signupErr} setFormErr={setSignupErr} />
      )}
      <div className="invite-link-form-logo"></div>
      <h1 className="invite-link-form-title">Create your Account</h1>
      <div className="invite-link-input-container">
        <SignUpFormInput name="Occupation" required={true} err={occErr}>
          <Select
            className={`invite-link-form-dropdown ${
              occErr.err ? "error" : ""
            }`}
            classNamePrefix={"dropdown-input"}
            options={occupationData}
            onChange={onOccChange}
            onBlur={onOccTouch}
          />
        </SignUpFormInput>
        <SignUpFormInput name="Phone Number" required={false} err={phoneErr}>
          <input
            className={`default-inputs ${phoneErr.err ? "error" : ""}`}
            type={"number"}
            value={phoneNum}
            required={false}
            onChange={onPhoneChange}
            onBlur={onPhoneTouch}
          />
        </SignUpFormInput>
      </div>
      <div className="invite-link-google-auth">
        {!confirmCred ? (
          <PlaceHolderGoogle btnDisabled={!confirmCred} />
        ) : (
          <GoogleBtn
            customData={customData}
            btnType="signup"
            customSuccessCallback={onSignUpSuccess}
            customErrorFunc={onSignUpError}
          />
        )}
      </div>
      <div className="invite-link-login">
        <p>Already have an account?</p>
        <Link to="/forms/login">Sign In</Link>
      </div>
    </form>
  );
};
export default SignUpForm;
