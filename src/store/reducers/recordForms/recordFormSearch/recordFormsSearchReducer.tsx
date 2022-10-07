import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus, RecordFormReducerProps } from "../types";
import { fetchRecordForms } from "../../asyncActions/recordFormActions/fetchRecordForms";
import { deleteRecordForms } from "../../asyncActions/recordFormActions/deleteRecordForms";
import { cloneDeep } from "lodash";
import { WritableDraft } from "immer/dist/internal";
import { FetchRecordFormsResult } from "../../asyncActions/recordFormActions/fetchRecordForms";
const updateLoadingState = (
  state: RecordFormReducerProps,
  loading: LoadingStatus["status"],
  requestType: "fetch" | "delete" | "update"
) => {
  const newState = {
    ...state,
    searched_data: { ...state.searched_data, status: loading },
    selected_record: { ...state.selected_record, status: loading },
  };
  return newState;
};

export const recordFormSearchSlice = createSlice({
  name: "recordFormSearchSlice",
  initialState: {
    searched_data: {
      data: [],
      idx_counter: 0,
      pagination_end: false,
      prev_search: { value: "", categories: [] },
      status: "success",
    },
    selected_record: {
      status: "success",
      data: null,
    },
  } as RecordFormReducerProps,
  reducers: {
    clearSearchData(state, action) {
      return {
        searched_data: {
          data: [],
          idx_counter: 0,
          pagination_end: false,
          prev_search: { value: "", categories: [] },
          status: "success",
        },
        selected_record: {
          status: "success",
          data: null,
        },
      };
    },
  },
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
      const currentData = newState.searched_data.data;

      const updateResults = (
        data: WritableDraft<FetchRecordFormsResult>["results"]
      ) => {
        //update searched data
        newState.searched_data = {
          ...newState.searched_data,
          ...response,
          data: data ? data : [],
        };
        //update selected data
        newState.selected_record.data =
          results && results.length > 0 ? results[0] : null;
        return newState;
      };
      //pagination logic
      if (response.idx_counter > currIdxCounter)
        updateResults(results ? [...currentData, ...results] : []);
      else updateResults(results);
      return updateLoadingState(newState, "success", "fetch");
    });
    builder.addCase(deleteRecordForms.pending, (state, action) => {
      return updateLoadingState(state, "loading", "delete");
    });
    builder.addCase(deleteRecordForms.rejected, (state, action) => {
      return updateLoadingState(state, "failed", "delete");
    });
    builder.addCase(deleteRecordForms.fulfilled, (state, action) => {
      const newState = cloneDeep(state);
      const response = action.payload;
      const searchedData = newState.searched_data;
      const selectedRecord = newState.selected_record;
      if (!response) return updateLoadingState(state, "failed", "delete");
      const removedRecords = response.removed_form_ids;
      const removedRecordsLookup = new Map(
        removedRecords.map((object) => {
          return [object, true];
        })
      );
      const filteredData = searchedData.data.filter(
        (doc) => !removedRecordsLookup.has(doc._id.toString())
      );
      searchedData.data = response.new_last_documents
        ? [...filteredData, ...response.new_last_documents]
        : filteredData;
      if (
        selectedRecord.data &&
        removedRecordsLookup.has(selectedRecord.data._id.toString())
      )
        selectedRecord.data = null;
      return updateLoadingState(newState, "success", "update");
    });
  },
});
export const { clearSearchData } = recordFormSearchSlice.actions;
