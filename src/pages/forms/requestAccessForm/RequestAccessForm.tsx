import { useState } from "react";
import validEmail from "../../../helperFunctions/validateEmail";
import FormErrBanner from "../../utilityComponents/formErrBanner/FormErrBanner";
import RequestAccessInput from './RequestAccessInput'
import FormContact from './RequestAccessFormContact'
import FormSubmitted from "./RequestAccessFormSubmitted"
interface DataPayLoad {
  first_name: string;
  last_name: string;
  email: string;
  occupation: string;
  purpose: string;
  phone_number?: string;
  preferred_contact?: string;
}
export type{DataPayLoad}
const RequestAccessForm = (): JSX.Element => {
  const [formErr, setFormErr] = useState({
    err: false,
    message: "",
  });
  const [submitLoading, setSumbitLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState<false | DataPayLoad>(false)
  //const naviagte = useNavigate()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const dataPayload: DataPayLoad = {
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
      preferred_contact: typeof fieldValues["Preferred Contact"] === 'string'
      ? fieldValues["Preferred Contact"] : '',
    };
    if (typeof fieldValues["Phone Number"] === "string")
      dataPayload.phone_number = fieldValues["Phone Number"];
    console.log(dataPayload)
    try {
      setSumbitLoading(true)
      //write async request here
      setFormSubmitted(dataPayload)
    } catch (e) {
      console.error(e)
      setFormErr({err: true, message:"Form could not be submitted"})
    }
  };
  return (
    <form id="request-access-form" onSubmit={onSubmit}>
      {formSubmitted && <FormSubmitted data={formSubmitted}/>}
      {formErr.err && <FormErrBanner formErr={formErr} setFormErr={setFormErr}/>}
      <h1>Become a Contributor</h1>
      <RequestAccessInput name="First Name" />
      <RequestAccessInput name="Last Name" />
      <RequestAccessInput name="Gmail Account" customValidation={validEmail} />
      <RequestAccessInput name="Occupation" />
      <RequestAccessInput name="Why do you want to join?" textArea={true} />
      <FormContact />
      <button type="submit" className="request-access-form-submit-btn">
        Submit
      </button>
    </form>
  );
};
export default RequestAccessForm;
