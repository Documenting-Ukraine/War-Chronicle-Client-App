import { useDispatch } from "react-redux";
import { updateFormProps } from "../store/reducers/recordForms/recordFormSubmission/recordFormSubmissionReducer";
import { RecordSubmissionType } from "../types";

const useRecordFormPropUpdate = (
  recordType?: RecordSubmissionType["record_type"]
): ((e: Partial<RecordSubmissionType>) => void) => {
  const dispatch = useDispatch();
  const updateStoreProps = (e: Partial<RecordSubmissionType>) =>
    dispatch(
      updateFormProps({
        ...e,
        record_type: recordType,
      })
    );
  return updateStoreProps;
};
export default useRecordFormPropUpdate;
