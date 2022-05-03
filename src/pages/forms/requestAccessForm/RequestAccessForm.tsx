import { useState } from "react";
import validEmail from "../../../helperFunctions/validateEmail";
import FormErrBanner from "../../utilityComponents/formErrBanner/FormErrBanner";
import RequestAccessInput from "./RequestAccessInput";
import FormContact from "./RequestAccessFormContact";
import FormSubmitted from "./RequestAccessFormSubmitted";
import realmApiCalls from "../../../helperFunctions/realmApiCalls";
import { unstable_batchedUpdates } from "react-dom";
import PopUpBg from "../../utilityComponents/popUpBg/PopUpBg";
import LoadingMessage from "../../utilityComponents/loadingMessage/LoadingMessage";
import { occupationData } from "../data/OccupationList";
import { NewUserRequest } from "../../../store/reducers/dashboard/reviewRequests/types";
import { categoryDropdownOptions, isCategoryScope } from "../../../types/dataTypes/CategoryIconMap";
const RequestAccessForm = (): JSX.Element => {
  const [formErr, setFormErr] = useState({
    err: false,
    message: "",
  });
  const [submitLoading, setSumbitLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState<
    false | Omit<NewUserRequest, "creation_date" | "_id">
  >(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    if(!isCategoryScope(fieldValues["What category do you want to contribute to?"])) return
    const dataPayload: Omit<NewUserRequest, "creation_date" | "_id"> = {
      first_name:
        typeof fieldValues["First Name"] === "string"
          ? fieldValues["First Name"]
          : "",
      last_name:
        typeof fieldValues["Last Name"] === "string"
          ? fieldValues["Last Name"]
          : "",
      email:
        typeof fieldValues["Gmail Account"] === "string"
          ? fieldValues["Gmail Account"]
          : "",
      occupation:
        typeof fieldValues["Occupation"] === "string"
          ? fieldValues["Occupation"]
          : "",
      purpose:
        typeof fieldValues["Why do you want to join?"] === "string"
          ? fieldValues["Why do you want to join?"]
          : "",
      preferred_contact:
        typeof fieldValues["Preferred Contact"] === "string" &&
        fieldValues["Preferred Contact"] === "Phone Number"
          ? "Phone Number"
          : "E-mail",
      category: fieldValues["What category do you want to contribute to?"] 
    };
    if (typeof fieldValues["Phone Number"] === "string")
      dataPayload.phone_number = fieldValues["Phone Number"];
    try {
      setSumbitLoading(true);
      //write async request here
      const result = await realmApiCalls(dataPayload, "put");
      const user_exists = result.data.user_exists
      const request_exists = result.data.result?.upsertedId;
      unstable_batchedUpdates(() => {
        if (!user_exists && !request_exists)
          setFormErr({
            err: true,
            message:
              "A request has already been submitted. Please wait for approval",
          });
        else if(user_exists){
          setFormErr({
            err: true,
            message:
              "This email is already taken. Please Log in",
          });
        }
        else {
          setFormErr({
            err: false,
            message: "",
          });
          setFormSubmitted(dataPayload);
        }
        setSumbitLoading(false);
      });
    } catch (e) {
      console.error(e, dataPayload);
      unstable_batchedUpdates(() => {
        setSumbitLoading(false);
        setFormErr({ err: true, message: "Form could not be submitted" });
      });
    }
  };
  const categoriesListOptions = categoryDropdownOptions(null)
  return (
    <form id="request-access-form" onSubmit={onSubmit}>
      {submitLoading && (
        <PopUpBg className="request-form-container-loading">
          <LoadingMessage text={"Sending Form..."} />
        </PopUpBg>
      )}
      {formErr.err && (
        <FormErrBanner formErr={formErr} setFormErr={setFormErr} />
      )}
      {formSubmitted ? (
        <FormSubmitted data={formSubmitted} />
      ) : (
        <>
          <h1>Become a Contributor</h1>
          <RequestAccessInput name="First Name" />
          <RequestAccessInput name="Last Name" />
          <RequestAccessInput
            name="Gmail Account"
            customValidation={validEmail}
          />
          <RequestAccessInput name="Occupation" dropDown={occupationData} />
          <RequestAccessInput name="What category do you want to contribute to?" dropDown={categoriesListOptions} />
          <RequestAccessInput name="Why do you want to join?" textArea={true} />
          <FormContact />
          <button type="submit" className="request-access-form-submit-btn">
            Submit
          </button>
        </>
      )}
    </form>
  );
};
export default RequestAccessForm;
