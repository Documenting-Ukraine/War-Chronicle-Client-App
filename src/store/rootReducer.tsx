import { combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "./reducers/dashboard/userDashboard";
const rootReducer = combineReducers({
  dashboard: dashboardSlice.reducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
