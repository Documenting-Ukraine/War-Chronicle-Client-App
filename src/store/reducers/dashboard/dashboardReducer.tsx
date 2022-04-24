import userListSlice from "./userList/userListReducer";
import contributionsSlice from "./contributions/contributionsReducer";
import { combineReducers } from "redux";
import pastYearActivitySlice from "./recordActivity/pastYearActivityReducer";
import { fetchActivityData, ActivityDataTemplate } from "../asyncActions/fetchActivityData";
import { RecordSubmissionType, UserDocument } from "../../../types/dataTypes";
import { fetchContributions } from "../asyncActions/fetchContributions";
import reviewNewScopeRequestSlice from "./reviewRequests/reviewScopeRequest";
import reviewNewUserRequestSlice from "./reviewRequests/reviewNewUserRequest";
const dashboardReducer = combineReducers({
  pastYearActivityData: pastYearActivitySlice.reducer,
  contributionsData: contributionsSlice.reducer,
  userListData: userListSlice.reducer,
  reviewScopeRequests: reviewNewScopeRequestSlice.reducer,
  reviewNewUserRequests: reviewNewUserRequestSlice.reducer
});

export default dashboardReducer;
export { fetchActivityData, fetchContributions };
export type { ActivityDataTemplate, RecordSubmissionType, UserDocument };
