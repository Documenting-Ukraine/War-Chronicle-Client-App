import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { useDropZoneProvider } from "../../../utilityComponents/formInputs/FormDropZone/FormDropZoneContext";
import extractGeneralInputs from "../utilityFuncs/extractGeneralInputs";
const RecordFormSubmitWrapper = ({
  recordType,
  children,
}: {
  recordType: string;
  children: JSX.Element;
}) => {
  const {images, videos} = useDropZoneProvider()
  const additionalFormData = useSelector(
    (state: RootState) => state.recordForms.submission
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    // const images = 
    // const videos = 
    const generalInputs = {
      ...extractGeneralInputs(fieldValues),
      record_type: recordType,
      media: {
        images,
        videos
      }
    };
    const additionalInputs = { ...additionalFormData };
    const submissionObject = {
      generalInputs,
      additionalInputs,
    };
    console.log(generalInputs)
  };
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button
        className={"record-form-submit-btn"}
        type="submit"
        aria-label={"submit-new-record"}
      >
        <span>Submit</span>
      </button>
    </form>
  );
};
export default RecordFormSubmitWrapper;
