import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus, RecordFormReducerProps } from "./types";
import { updateRecordForm } from "../asyncActions/recordFormActions/updateRecordForms";
import { fetchRecordForms } from "../asyncActions/recordFormActions/fetchRecordForms";
import { deleteRecordForms } from "../asyncActions/recordFormActions/deleteRecordForms";
import { cloneDeep } from "lodash";
const updateLoadingState = (
  state: RecordFormReducerProps,
  loading: LoadingStatus["status"],
  requestType: "fetch" | "delete" | "update"
) => {
  const newState = {
    ...state,
    searched_data: { ...state.searched_data, status: loading },
    selected_record: { ...state.selected_record, status: loading },
    recently_updated_record: { ...state.recently_updated_record },
  };
  if (requestType === "update")
    newState.recently_updated_record.status = loading;
  return newState;
};
const recordFormReducer = createSlice({
  name: "recordFormSlice",
  initialState: {
    searched_data: {
      data: [],
      idx_counter: 0,
      status: "success",
    },
    selected_record: {
      status: "success",
      data: null,
    },
    recently_updated_record: {
      data: null,
      status: "success",
    },
  } as RecordFormReducerProps,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecordForms.pending, (state, action) => {
      return updateLoadingState(state, "loading", "fetch");
    });
    builder.addCase(fetchRecordForms.rejected, (state, action) => {
      return updateLoadingState(state, "failed", "fetch");
    });
    builder.addCase(fetchRecordForms.fulfilled, (state, action) => {
      const newState = cloneDeep(state);
      const response = action.payload;
      if (!response) return updateLoadingState(newState, "failed", "fetch");
      const results = response.results;
      const currIdxCounter = state.searched_data.idx_counter;
      if (response.idx_counter <= currIdxCounter) {
        newState.searched_data.data = results ? results : [];
        newState.selected_record.data =
          results && results.length > 0 ? results[0] : null;
        return updateLoadingState(newState, "success", "fetch");
      }
      if (!results) return updateLoadingState(state, "success", "fetch");
    });
    builder.addCase(updateRecordForm.pending, (state, action) => {
      return updateLoadingState(state, "loading", "update");
    });
    builder.addCase(updateRecordForm.rejected, (state, action) => {
      return updateLoadingState(state, "failed", "update");
    });
    builder.addCase(updateRecordForm.fulfilled, (state, action) => {
      const newState = cloneDeep(state)
      const response = action.payload
      
    });
    builder.addCase(deleteRecordForms.pending, (state, action) => {
      return updateLoadingState(state, "loading", "delete");
    });
    builder.addCase(deleteRecordForms.rejected, (state, action) => {
      return updateLoadingState(state, "failed", "delete");
    });
    builder.addCase(deleteRecordForms.fulfilled, (state, action) => {});
  },
});
