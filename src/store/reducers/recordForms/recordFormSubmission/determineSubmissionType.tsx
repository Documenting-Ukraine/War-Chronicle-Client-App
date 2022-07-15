import { RecordSubmissionType } from "../../dashboard/dashboardReducer";
import { FormSubmssionProps } from "./recordFormSubmissionReducer";
function mergeProps<T> (
  state: T,
  payload: T
): T {
  return{
    ...state, 
    ...payload
  }
};
export const determineSubmissionType = (
  copyState: Partial<RecordSubmissionType>,
  payload: Partial<RecordSubmissionType>
): FormSubmssionProps | undefined => {
  switch (copyState.record_type) {
    case "International Response":
      if (payload.record_type === "International Response")
        return mergeProps(copyState, payload);
      break;
    case "Media And Disinformation":
      if (payload.record_type === "Media And Disinformation")
        return mergeProps(copyState, payload)
      break;
    case "Protests Abroad":
      if (payload.record_type === "Protests Abroad")
        return mergeProps(copyState, payload)
      break;
    case "Refugees And IDPs":
      if (payload.record_type === "Refugees And IDPs")
        return mergeProps(copyState, payload)
      break;
    case "Russia":
      if (payload.record_type === "Russia")
        return mergeProps(copyState, payload)
      break;
    case "War Crimes":
      if (payload.record_type === "War Crimes")
        return mergeProps(copyState, payload)
      break;
    default:
      return copyState;
  }
};
