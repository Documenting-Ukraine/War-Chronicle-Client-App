import { createSlice } from "@reduxjs/toolkit";
import { isScopeRequestsSlice, ScopeRequestSlice } from "./types";
import { fetchFulfilledReviewRequests, deleteFulfilledReviewRequests } from "./types";
import { fetchScopeRequest, deleteScopeRequest } from "../dashboardReducer";

const reviewNewScopeRequestSlice = createSlice({
  name: "reviewNewScopeRequestSlice",
  initialState: {
    key: "reviewNewScopeRequestSlice",
    data: null,
    status: "success",
    pagination_end: false,
    idx_counter: 0,
    recently_deleted: {
      document: null,
      status: "success",
    }
  } as ScopeRequestSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchScopeRequest.pending, (state, action) => {
      state.status = "loading";
      return state;
    });
    builder.addCase(fetchScopeRequest.rejected, (state, action) => {
      state.status = "failed";
      console.error(state, action);
      return state;
    });
    builder.addCase(fetchScopeRequest.fulfilled, (state, action) => {
      const newState = fetchFulfilledReviewRequests(state, action.payload)
      if(isScopeRequestsSlice(newState)) return newState
      else return state
    });
    builder.addCase(deleteScopeRequest.pending, (state, action) => {
      state.recently_deleted.status = "loading";
      return state;
    });
    builder.addCase(deleteScopeRequest.rejected, (state, action) => {
      state.recently_deleted.status = "failed";
      return state;
    });
    builder.addCase(deleteScopeRequest.fulfilled, (state, action) => {
      const scopeListIdx = action.payload ? action.payload.scope_list_idx : 0;
      const newState = deleteFulfilledReviewRequests(state, action.payload, scopeListIdx)
      if(newState.key === "reviewNewScopeRequestSlice") return newState
      else return state
    });
  },
});
export default reviewNewScopeRequestSlice;
