import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContributions,
  ContributionsData,
} from "./asyncActions/fetchContributions";
import {
  fetchActivityData,
  ActivityDataTemplate,
} from "./asyncActions/fetchActivityData";
interface DashboardSlice {
  pastYearActivityData: {
    data: ActivityDataTemplate | null;
    status: "success" | "loading" | "failed";
  };
  contributionsData: {
    data: ContributionsData | null;
    status: "success" | "loading" | "failed";
  };
}
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    pastYearActivityData: {
      data: null,
      status: "success",
    },
    contributionsData: {
      data: null,
      status: "success",
    },
  } as DashboardSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActivityData.pending, (state, action) => {
      state.pastYearActivityData.status = "loading";
      return state;
    });
    builder.addCase(fetchActivityData.rejected, (state, action) => {
      state.pastYearActivityData.status = "failed"
      console.error(state, action);
    });
    builder.addCase(fetchActivityData.fulfilled, (state, action) => {
      const success: { status: "success"; data: ActivityDataTemplate | null } =
        {
          status: "success",
          data: action.payload,
        };
      state = { ...state, pastYearActivityData: success };
      console.log(state, action);
      return state;
    });
    builder.addCase(fetchContributions.fulfilled, (state, action) => {
      const success: {
        status: "success";
        data: ContributionsData | null;
      } = {
        status: "success",
        data:
          state.contributionsData.data && action.payload
            ? { ...state.contributionsData.data, ...action.payload }
            : !action.payload ? state.contributionsData.data 
            : action.payload
      };
      state = { ...state, contributionsData: success };
      return state;
    });
    builder.addCase(fetchContributions.pending, (state, action) => {
        state.contributionsData.status = "loading";
        return state;
    });
    builder.addCase(fetchContributions.rejected, (state, action) => {
      state.contributionsData.status = "failed";
      return state;
    });
  },
});
export default dashboardSlice;
export { fetchActivityData, fetchContributions };
export type { ActivityDataTemplate, ContributionsData };
