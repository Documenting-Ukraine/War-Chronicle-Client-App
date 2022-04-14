import { combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "./reducers/dashboard/dashboardReducer";
const rootReducer = combineReducers({
  dashboard: dashboardSlice,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
