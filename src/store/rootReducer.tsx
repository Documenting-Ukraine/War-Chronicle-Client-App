import { combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "./reducers/dashboard/dashboardReducer";
import recordFormSlice from "./reducers/recordForms/recordFormReducer";
const rootReducer = combineReducers({
  dashboard: dashboardSlice,
  recordForms: recordFormSlice,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
