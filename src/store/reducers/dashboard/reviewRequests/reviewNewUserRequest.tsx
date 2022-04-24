import { createSlice } from "@reduxjs/toolkit";
import {
  NewUserRequestSlice,
  fetchFulfilledReviewRequests,
  deleteFulfilledReviewRequests,
  isNewUserRequestsSlice
} from "./types";
import { fetchNewUserRequest, deleteNewUserRequest } from "../dashboardReducer";
const reviewNewUserRequestSlice = createSlice({
  name: "reviewNewUserRequestSlice",
  initialState: {
    key: "reviewNewUserRequestSlice",
    data: null,
    status: "success",
    pagination_end: false,
    idx_counter: 0,
    recently_deleted: {
      document: null,
      status: "success",
    },
  } as NewUserRequestSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewUserRequest.pending, (state, action) => {
      state.status = "loading";
      return state;
    });
    builder.addCase(fetchNewUserRequest.rejected, (state, action) => {
      state.status = "failed";
      console.error(state, action);
      return state;
    });
    builder.addCase(fetchNewUserRequest.fulfilled, (state, action) => {
      const newState = fetchFulfilledReviewRequests(state, action.payload);
      if(isNewUserRequestsSlice(newState)) return newState
      else return state 
    });
    builder.addCase(deleteNewUserRequest.pending, (state, action) => {
      state.recently_deleted.status = "loading";
      return state;
    });
    builder.addCase(deleteNewUserRequest.rejected, (state, action) => {
      state.recently_deleted.status = "failed";
      return state;
    });
    builder.addCase(deleteNewUserRequest.fulfilled, (state, action) => {
      const userReviewListIdx = action.payload
        ? action.payload.user_review_list_idx
        : 0;
      const newState = deleteFulfilledReviewRequests(
        state,
        action.payload,
        userReviewListIdx
      );
      if(newState.key==="reviewNewUserRequestSlice") return newState
      else return state
    });
  },
});
export default reviewNewUserRequestSlice;
