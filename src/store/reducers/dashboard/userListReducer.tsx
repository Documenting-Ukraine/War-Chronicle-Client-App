import { fetchUserData } from "../asyncActions/fetchUsers";
import { UserDocument } from "../../../types/dataTypes";
import { createSlice } from "@reduxjs/toolkit";
import { GenericDashboardData } from "./types";
import { UserSortProps } from "../../../pages/dashboard/utilities/userList/types";

type UserListProps = GenericDashboardData<UserDocument[]> & {
  pagination_end: boolean;
  prev_search: string;
  idx_counter?: number;
  prev_order: UserSortProps;
};
const userListSlice = createSlice({
  name: "userListSlice",
  initialState: {
    data: [],
    status: "success",
    pagination_end: false,
    prev_search: "",
    prev_order: undefined,
    idx_counter: 0,
  } as UserListProps,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.status = "loading";
      return state;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = "failed";
      console.error(state, action);
      return state;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      const success: UserListProps = {
        status: "success",
        pagination_end: action.payload ? action.payload.pagination_end : true,
        prev_search: action.payload?.prev_search
          ? action.payload.prev_search
          : "",
        prev_order: action.payload?.prev_order,
        idx_counter: action.payload?.idx_counter,
        data:
          state.data && action.payload
            ? [...state.data, ...action.payload.results]
            : !action.payload
            ? state.data
            : action.payload.results,
      };
      if (state.data && action.payload) {
        //if not paginating, the idx_counter will be less be 1 or less
        if (action.payload.idx_counter <= 1)
          success.data = action.payload.results;
        //if paginating, we have an idx_counter greater than 1
        else success.data = [...state.data, ...action.payload.results];
      } else if (!action.payload) success.data = state.data;
      else success.data = action.payload.results;
      return success;
    });
  },
});
export default userListSlice;
