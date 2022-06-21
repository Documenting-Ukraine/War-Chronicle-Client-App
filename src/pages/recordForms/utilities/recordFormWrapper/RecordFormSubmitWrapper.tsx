import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import extractGeneralInputs from "../utilityFuncs/extractGeneralInputs";
const RecordFormSubmitWrapper = ({ children }: { children: JSX.Element }) => {
  const additionalFormData = useSelector(
    (state: RootState) => state.recordForms.submission
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const generalInputs = extractGeneralInputs(fieldValues);
    const additionalInputs = { ...additionalFormData };
    const submissionObject = {
      generalInputs,
      additionalInputs,
    };
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
