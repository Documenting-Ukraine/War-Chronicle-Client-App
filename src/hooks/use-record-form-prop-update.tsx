import { useDispatch } from "react-redux";
import { updateFormProps } from "../store/reducers/recordForms/recordFormSubmission/recordFormSubmissionReducer";
import { RecordSubmissionType } from "../types";

const useRecordFormPropUpdate = (): ((
  e: Partial<RecordSubmissionType>
) => void) => {
  const dispatch = useDispatch();
  const updateStoreProps = (e: Partial<RecordSubmissionType>) =>
    dispatch(
      updateFormProps({
        payload: e,
      })
    );
  return updateStoreProps;
};
export default useRecordFormPropUpdate;
