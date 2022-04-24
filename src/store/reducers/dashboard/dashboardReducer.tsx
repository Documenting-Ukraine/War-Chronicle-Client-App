import userListSlice from "./userList/userListReducer";
import { combineReducers } from "redux";
import contributionsSlice from "./contributions/contributionsReducer";
import pastYearActivitySlice from "./recordActivity/pastYearActivityReducer";
import reviewNewScopeRequestSlice from "./reviewRequests/reviewScopeRequest";
import reviewNewUserRequestSlice from "./reviewRequests/reviewNewUserRequest";
//async actions
import {
  fetchActivityData,
  ActivityDataTemplate,
} from "../asyncActions/fetchActivityData";
import { fetchContributions } from "../asyncActions/fetchContributions";
import { fetchNewUserRequest } from "../asyncActions/requestActions/fetchNewUserRequest";
import { fetchScopeRequest } from "../asyncActions/requestActions/fetchScopeRequest";
import { deleteNewUserRequest } from "../asyncActions/requestActions/deleteNewUserRequest";
import { deleteScopeRequest } from "../asyncActions/requestActions/deleteScopeRequest";
//general data types
import { RecordSubmissionType, UserDocument } from "../../../types/dataTypes";
const dashboardReducer = combineReducers({
  pastYearActivityData: pastYearActivitySlice.reducer,
  contributionsData: contributionsSlice.reducer,
  userListData: userListSlice.reducer,
  reviewScopeRequests: reviewNewScopeRequestSlice.reducer,
  reviewNewUserRequests: reviewNewUserRequestSlice.reducer,
});

export default dashboardReducer;
export {
  fetchScopeRequest,
  fetchNewUserRequest,
  fetchActivityData,
  fetchContributions,
  deleteNewUserRequest,
  deleteScopeRequest,
};
export type { ActivityDataTemplate, RecordSubmissionType, UserDocument };
