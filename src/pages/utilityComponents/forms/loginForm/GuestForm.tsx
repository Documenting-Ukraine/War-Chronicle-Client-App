import { useState } from "react"
import { User } from "realm-web";
import useLoginError from "../../../../hooks/use-login-error"
import { useRealmApp } from "../../../../realm/RealmApp";
import guestLogin from "../../../../realm/auth/guestAuth";
import FormLogo from "../FormLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {occupationData } from "./data/OccupationList"
import Select from "react-select";
import { purposeList } from "./data/Purpose.List";
interface GuestFormProps {
    setGuestLogin: (e: false) => void,
    onSignInSuccess: (e: User) => void
}
interface FormRowProps{
    children: JSX.Element,
    heading: string
}
const FormRow = ({children, heading}: FormRowProps): JSX.Element => {
    return <div className="login-guest-form-row">
        <h2>{heading}</h2>
        <div className="login-guest-form-row-body">
            {children}
        </div>
    </div>
}
// const FormatRowLabel = (data: GroupedOption)
const GuestForm = ({
    setGuestLogin,
    onSignInSuccess
}: GuestFormProps): JSX.Element => {
    const [purpose, setPurpose] = useState("")
    const [organization, setOrganization] = useState({ selected: false, orgName: "" })
    const [occupation, setOccupation] = useState("")
    const app = useRealmApp()
    const [signInErr, onSignInError] = useLoginError({
        loginType: "guestLogin"
    });
    const customData = {
        purpose: purpose,
        organization: organization,
        occupation: occupation
    }

    return (
      <div className="login-guest-form-container">
        <button
          aria-label="return to first login page"
          onClick={() => setGuestLogin(false)}
          className={"login-guest-form-back-btn"}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {signInErr.err && (
          <div className="alert alert-danger login-pg-err-banner">
            {signInErr.message}
          </div>
        )}
        <FormLogo />
        <form className="login-guest-form">
          <FormRow heading="What will you use this service for?">
            <Select
              options={purposeList}
              className={"login-group-form-dropdown"}
              classNamePrefix={"dropdown-input"}
            />
          </FormRow>
          <FormRow heading="Occupation">
            <Select
              options={occupationData}
              className={"login-group-form-dropdown"}
              classNamePrefix={"dropdown-input"}
            />
          </FormRow>
          <FormRow heading="Are you part of an organization?">
            <>
              <input
                id={"login-guest-form-org-yes"}
                type={"radio"}
                name={"organization"}
                value={"yes"}
                checked={organization.selected}
                onChange={() =>
                  setOrganization((state) => {
                    return { ...state, selected: true };
                  })
                }
              />
              <label htmlFor="login-guest-form-org-yes">Yes</label>
              <input
                id={"login-guest-form-org-no"}
                type={"radio"}
                name={"organization"}
                value={"no"}
                checked={!organization.selected}
                onChange={() =>
                  setOrganization((state) => {
                    return { ...state, selected: false };
                  })
                }
              />
              <label htmlFor="login-guest-form-org-no">No</label>
            </>
          </FormRow>

          {organization.selected && (
            <FormRow heading="Organization Name">
              <input type={"text"} maxLength={100} required />
            </FormRow>
          )}

          <button
            type={"submit"}
            onClick={(e) => {
              //e.preventDefault()
              return guestLogin({
                app: app,
                customErrorFunc: onSignInError,
                customSuccessCallback: onSignInSuccess,
                customData: customData,
              });
            }}
            className="login-guest-form-auth-btn"
          >
            Start Exploring !
          </button>
        </form>
      </div>
    );
}
export default GuestForm