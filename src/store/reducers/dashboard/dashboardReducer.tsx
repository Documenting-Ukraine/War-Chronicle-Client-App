import userListSlice from "./userListReducer";
import contributionsSlice from "./contributionsReducer";
import { combineReducers } from "redux";
import pastYearActivitySlice from "./pastYearActivityReducer";
import { fetchActivityData, ActivityDataTemplate } from "../asyncActions/fetchActivityData";
import { RecordSubmissionType, UserDocument } from "../../../types/dataTypes";
import { fetchContributions } from "../asyncActions/fetchContributions";
const dashboardReducer = combineReducers({
  pastYearActivityData: pastYearActivitySlice.reducer,
  contributionsData: contributionsSlice.reducer,
  userListData: userListSlice.reducer,
});

export default dashboardReducer;
export { fetchActivityData, fetchContributions };
export type { ActivityDataTemplate, RecordSubmissionType, UserDocument };
