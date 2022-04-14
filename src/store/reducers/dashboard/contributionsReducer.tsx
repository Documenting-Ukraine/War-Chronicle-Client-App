import { RecordSubmissionType } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { GenericDashboardData } from "./types";
import { fetchContributions } from "./dashboardReducer";
const contributionsSlice = createSlice({
  name: "contributionsSlice",
  initialState: {
    data: null,
    status: "success",
  } as GenericDashboardData<RecordSubmissionType[]>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContributions.pending, (state, action) => {
      state.status = "loading";
      return state;
    });
    builder.addCase(fetchContributions.rejected, (state, action) => {
      state.status = "failed";
      console.error(state, action);
      return state;
    });
    builder.addCase(fetchContributions.fulfilled, (state, action) => {
      const success: {
        status: "success";
        data: RecordSubmissionType[] | null;
      } = {
        status: "success",
        data:
          state.data && action.payload
            ? [...state.data, ...action.payload]
            : !action.payload
            ? state.data
            : action.payload,
      };
      return success;
    });
  },
});
export default contributionsSlice;
