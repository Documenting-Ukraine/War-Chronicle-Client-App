import { useState, useEffect } from "react";
import GoogleBtn from "../../googleAuthBtn/GoogleAuthBtn";
import PlaceHolderGoogle from "../../googleAuthBtn/PlaceholderGoogle";
import onlyNumInput from "../../../../helperFunctions/onlyNumInput";
import { Link } from "react-router-dom";
const SignUpForm = ({
    inviteId = ""
}): JSX.Element => {
    const [occupation, setOccupation] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [confirmCred, setConfirmCred] = useState(false);
  
    //handle sign in with google button status
    useEffect(() => {
        if (occupation === "" && confirmCred) setConfirmCred(false);
        if (occupation !== "" && !confirmCred) setConfirmCred(true);
    }, [occupation, confirmCred])
    const customData = {
        occupation: occupation,
        phoneNumber: phoneNum,
        inviteId: inviteId
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
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNum(e.target.value),
        onKeyDown: onlyNumInput,
      },
    ];
    return (
        <form className="invite-link-form">
               
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
              customSuccessCallback={() => {}}
              customErrorFunc={() => {}}
            />
          )}
        </div>
        <div className="invite-link-login">
                <p>Already have an account?</p>
                <Link to="/login">Sign In</Link>
        </div>
      </form>
    );
} 
export default SignUpForm