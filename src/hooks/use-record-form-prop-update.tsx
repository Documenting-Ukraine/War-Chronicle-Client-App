import { useDispatch } from "react-redux";
import { determineSubmissionType } from "../store/reducers/recordForms/recordFormSubmission/determineSubmissionType";
import {
  FormSubmssionProps,
  updateFormProps,
} from "../store/reducers/recordForms/recordFormSubmission/recordFormSubmissionReducer";
import { RecordSubmissionType } from "../types";

const useRecordFormPropUpdate = (
  recordType?: RecordSubmissionType["record_type"]
): ((e: FormSubmssionProps) => void) => {
  const dispatch = useDispatch();
  const updateStoreProps = (e: FormSubmssionProps) => {
    const copyState = { record_type: recordType };
    const newProps = e;
    newProps.record_type = recordType
    const submissionProps = determineSubmissionType(copyState, newProps);
    if (submissionProps) dispatch(updateFormProps(submissionProps));
  };
  return updateStoreProps;
};
export default useRecordFormPropUpdate;
