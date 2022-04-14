import { fetchActivityData } from "./dashboardReducer";
import { createSlice } from "@reduxjs/toolkit";
import { GenericDashboardData } from "./types";
import { ActivityDataTemplate } from "./dashboardReducer";
const pastYearActivitySlice = createSlice({
  name: "pastYearActivitySlice",
  initialState: {
    data: null,
    status: "success",
  } as GenericDashboardData<ActivityDataTemplate>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActivityData.pending, (state, action) => {
      state.status = "loading";
      return state;
    });
    builder.addCase(fetchActivityData.rejected, (state, action) => {
      state.status = "failed";
      console.error(state, action);
    });
    builder.addCase(fetchActivityData.fulfilled, (state, action) => {
      const success: { status: "success"; data: ActivityDataTemplate | null } =
        {
          status: "success",
          data: action.payload,
        };
      return success;
    });
  },
});
export default pastYearActivitySlice;
