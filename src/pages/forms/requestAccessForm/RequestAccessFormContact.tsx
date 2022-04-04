import { useState } from "react";
import RequestAccessInput from "./RequestAccessInput";
import validPhoneNum from "../../../helperFunctions/validatePhoneNum";
const FormContact = () => {
      const [preferredContact, setPreferredContact] = useState({
        gmail: true,
        phoneNum: false,
      });
    return (
        <>
        <div className="request-access-form-contact-row">
        <p>How should we contact you?</p>
        <div className="contact-row-input">
          <input
            id="gmail-address"
            name="Preferred Contact"
            value="E-mail"
            type={"radio"}
            checked={preferredContact.gmail}
            onChange={() =>
              setPreferredContact({ phoneNum: false, gmail: true })
            }
          />
          <label htmlFor="gmail-address">Gmail Address</label>
        </div>
        <div className="contact-row-input">
          <input
            id="phone-number"
            name="Preferred Contact"
            value="Phone Number"
            type={"radio"}
            onChange={() =>
              setPreferredContact({ phoneNum: true, gmail: false })
            }
            checked={preferredContact.phoneNum}
          />
          <label htmlFor="phone-number" >Phone Number</label>
        </div>
      </div>
      {preferredContact.phoneNum && (
        <RequestAccessInput
          name="Phone Number"
          customValidation={validPhoneNum}
          inputType={"number"}
        />
        )}
    </>
    )
}
export default FormContact