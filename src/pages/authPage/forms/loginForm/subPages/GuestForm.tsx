import { useState } from "react";
import { User } from "realm-web";
import useLoginError from "../../../../../hooks/use-login-error";
import { useRealmApp } from "../../../../../realm/RealmApp";
import guestLogin from "../../../../../realm/auth/guestAuth";
import FormLogo from "../../../FormLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { occupationData, Option } from "../../../data/OccupationList";
import Select, { ActionMeta } from "react-select";
import { purposeList } from "../../../data/PurposeList";
import useValidateInput from "../../../../../hooks/use-validate-inputs";
import removeWhiteSpace from "../../../../../helperFunctions/removeWhiteSpace";
import PopUpBg from "../../../../utilityComponents/popUpBg/PopUpBg";
import LoginLoadingMessage from "../../../../utilityComponents/loadingMessage/LoadingMessage";
interface GuestFormProps {
  setGuestLogin: (e: false) => void;
  onSignInSuccess: (e: User) => void;
}
interface FormRowProps {
  children: JSX.Element;
  heading: string;
  errMessage?: string | null;
  required?: boolean
}
const FormRow = ({
  children,
  heading,
  errMessage,
  required = false
}: FormRowProps): JSX.Element => {
  return (
    <div className="login-guest-form-row">
          <h2>{heading}{required &&  <span>*</span> }</h2>
      <div className="login-guest-form-row-body">{children}</div>
      {errMessage && (
        <div className="login-guest-form-input-err">{errMessage}</div>
      )}
    </div>
  );
};

const GuestForm = ({
  setGuestLogin,
  onSignInSuccess,
}: GuestFormProps): JSX.Element => {
  const app = useRealmApp();
  //form input values
  const [purpose, setPurpose] = useState<string | null>(null);
  const [organization, setOrganization] = useState({
    selected: false,
    orgName: "",
  });
  const [occupation, setOccupation] = useState<string | null>(null);
  //errors
  const [purposeErr, validatePurpose] = useValidateInput();
  const [orgErr, validateOrg] = useValidateInput();
  const [occupationErr, validateOccupation] = useValidateInput();
  //signin
  const [signInErr, onSignInError] = useLoginError({
    loginType: "guestLogin",
  });
  const customData = {
    purpose: purpose ? purpose : "",
    organization: organization,
    occupation: occupation ? occupation : "",
  };

  return (
    <div className="login-guest-form-container">
      {app?.userLoading && (
        <PopUpBg className="login-form-container-loading">
          <LoginLoadingMessage text="Loading..." width={"60%"}/>
        </PopUpBg>
      )}
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
        <FormRow
          required={true}
          heading="What will you use this service for?"
          errMessage={purposeErr ? "Please select a response" : null}
        >
          <Select
            options={purposeList}
            className={"login-group-form-dropdown"}
            classNamePrefix={"dropdown-input"}
            onChange={(e) => setPurpose(e ? e.value : "")}
          />
        </FormRow>
        <FormRow
          required={true}
          heading="Occupation"
          errMessage={occupationErr ? "Please select an occupation" : null}
        >
          <Select
            options={occupationData}
            className={"login-group-form-dropdown"}
            classNamePrefix={"dropdown-input"}
            onChange={(option: Option | null, actionMeta: ActionMeta<Option>) =>
              setOccupation(option ? option.value : "")
            }
          />
        </FormRow>
        <FormRow heading="Are you part of an organization?" required={true}>
          <>
            <input
              id={"login-guest-form-org-yes"}
              type={"radio"}
              name={"organization"}
              value={"yes"}
              checked={organization.selected}
              onChange={() =>
                setOrganization((state) => {
                  return { orgName: state.orgName, selected: true };
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
              onChange={() => setOrganization({ orgName: "", selected: false })}
            />
            <label htmlFor="login-guest-form-org-no">No</label>
          </>
        </FormRow>

        {organization.selected && (
          <FormRow
            heading="Organization Name"
            errMessage={orgErr ? "Please enter a valid name" : null}
            required={true}
          >
            <input
              value={organization.orgName}
              type={"text"}
              maxLength={100}
              required
              onChange={(e) =>
                setOrganization((state) => {
                  return { ...state, orgName: e.target.value };
                })
              }
            />
          </FormRow>
        )}

        <button
          type={"submit"}
          onClick={(e) => {
            e.preventDefault();
            //handle err updates
            const validOrgCondition1 =
              !organization.selected &&
              removeWhiteSpace(organization.orgName) === "";
            const validOrgCondition2 =
              organization.selected &&
              removeWhiteSpace(organization.orgName) !== "";

            const occIsValid = validateOccupation(
              typeof occupation === "string"
            );
            const orgIsValid = validateOrg(
              validOrgCondition1 || validOrgCondition2
            );
            const purposeIsValid = validatePurpose(typeof purpose === "string");
            if (!occIsValid || !orgIsValid || !purposeIsValid) return;
            return guestLogin({
              app: app,
              customErrorFunc: onSignInError,
              customSuccessCallback: onSignInSuccess,
              customData: customData,
            });
          }}
          className={"login-guest-form-auth-btn"}
        >
          Start Exploring !
        </button>
      </form>
    </div>
  );
};
export default GuestForm;
