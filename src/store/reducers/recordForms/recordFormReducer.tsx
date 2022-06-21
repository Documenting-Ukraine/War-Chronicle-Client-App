import { combineReducers } from "redux";
import { recordFormSearchSlice } from "./recordFormSearch/recordFormsSearchReducer";
import { recordFormSubmissionSlice } from "./recordFormSubmission/recordFormSubmissionReducer";
const recordFormSlice = combineReducers({
  search: recordFormSearchSlice.reducer,
  submission: recordFormSubmissionSlice.reducer,
});
export default recordFormSlice;
