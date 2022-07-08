import { RecordSubmissionType } from "../../dashboard/dashboardReducer";

export const determineSubmissionType = (
  copyState: Partial<RecordSubmissionType>,
  payload: Partial<RecordSubmissionType>
) => {
  switch (copyState.record_type) {
    case "International Response":
      if (payload.record_type === "International Response")
        return {
          ...copyState,
          ...payload,
        };
      break;
    case "Media And Disinformation":
      if (payload.record_type === "Media And Disinformation")
        return {
          ...copyState,
          ...payload,
        };
      break;
    case "Protests Abroad":
      if (payload.record_type === "Protests Abroad")
        return {
          ...copyState,
          ...payload,
        };
      break;
    case "Refugees And IDPs":
      if (payload.record_type === "Refugees And IDPs")
        return {
          ...copyState,
          ...payload,
        };
      break;
    case "Russia":
      if (payload.record_type === "Russia")
        return {
          ...copyState,
          ...payload,
        };
      break;
    case "War Crimes":
      if (payload.record_type === "War Crimes")
        return {
          ...copyState,
          ...payload,
        };
      break;
    default:
      return copyState
  }
};
