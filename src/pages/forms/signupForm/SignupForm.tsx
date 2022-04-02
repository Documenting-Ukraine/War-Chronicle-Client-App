import { useState, useEffect } from "react";
import GoogleBtn from "../../utilityComponents/googleAuthBtn/GoogleAuthBtn";
import PlaceHolderGoogle from "../../utilityComponents/googleAuthBtn/PlaceholderGoogle";
import onlyNumInput from "../../../helperFunctions/onlyNumInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User } from "realm-web";
import ExitIcon from "../../utilityComponents/exitIcon/ExitIcon";
import { useParams } from "react-router-dom";

const SignUpForm = (): JSX.Element => {
  const params = useParams();
  const inviteId = params.id;
  const [occupation, setOccupation] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [confirmCred, setConfirmCred] = useState(false);
  const [signupErr, setSignupErr] = useState({ err: false, message: "" });
  const naviagte = useNavigate();

  //handle sign in with google button status
  useEffect(() => {
    if (occupation === "" && confirmCred) setConfirmCred(false);
    if (occupation !== "" && !confirmCred) setConfirmCred(true);
  }, [occupation, confirmCred]);
  const customData = {
    occupation: occupation,
    phoneNumber: phoneNum,
    inviteId: inviteId ? inviteId : "",
  };
  const inviteLinkInputs = [
    {
      type: "text",
      inputVal: occupation,
      heading: "Occupation",
      required: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setOccupation(e.target.value);
      },
      onKeyDown: undefined,
    },
    {
      type: "number",
      inputVal: phoneNum,
      heading: "Phone Number",
      required: false,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPhoneNum(e.target.value),
      onKeyDown: onlyNumInput,
    },
  ];
  const onSignUpError = () => {
    setSignupErr({
      err: true,
      message: `We could not sign you up. Please contact ${process.env.REACT_APP_SUPPORT_EMAIL} for more information`,
    });
  };
  const onSignUpSuccess = (user: User) => {
    //navigate to user dashboard
    naviagte(`/dashboard/${user.id}`);
  };
  return (
    <form className="invite-link-form">
      {signupErr.err && (
        <div className="alert alert-danger invite-link-err-banner">
          {signupErr.message}
          <button
            aria-label="close banner"
            onClick={() => setSignupErr({ err: false, message: "" })}
          >
            <ExitIcon customStrokeWidth="0.5rem" />
          </button>
        </div>
      )}
      <div className="invite-link-form-logo"></div>
      <h1 className="invite-link-form-title">Create your Account</h1>
      <div className="invite-link-input-container">
        {inviteLinkInputs.map((input) => {
          return (
            <div key={input.heading} className="invite-link-input">
              <div>
                <h2>{input.heading}</h2>
                <span>{input.required ? "*" : ""}</span>
              </div>
              <input
                type={input.type}
                value={input.inputVal}
                required={input.required}
                onChange={input.onChange}
                onKeyDown={input.onKeyDown}
              />
            </div>
          );
        })}
      </div>
      <div className="invite-link-google-auth">
        {!confirmCred ? (
          <PlaceHolderGoogle btnDisabled={confirmCred} />
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
