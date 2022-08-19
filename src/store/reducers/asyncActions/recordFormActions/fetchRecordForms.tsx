import { createAsyncThunk } from "@reduxjs/toolkit";
import { ObjectId } from "mongodb";
import { RealmApp } from "../../../../realm/RealmApp";
import { RecordSubmissionType } from "../../dashboard/dashboardReducer";
import { isObject, has } from "lodash";
import { WritableDraft } from "immer/dist/internal";
import { RecordFormSearchQuery } from "../../recordForms/types";
export const oldestFormDate = new Date("1970-01-01 00:00:00 UTC+00");

type FetchRecordFormsProps = {
  app: RealmApp;
  input: {
    searchQuery: RecordFormSearchQuery;
    idx_counter?: number;
    pagination_idx?: string | ObjectId;
  };
};
export type FetchRecordFormsResult = {
  error: null;
  pagination_end: boolean;
  results: RecordSubmissionType[] | null;
  prev_search: RecordFormSearchQuery;
  idx_counter: number;
};
export const isFetchRecordFormsResult = (
  e: any
): e is WritableDraft<FetchRecordFormsResult> => {
  try {
    const isObj = isObject(e);
    const hasKeys =
      has(e, "pagination_end") &&
      has(e, "results") &&
      has(e, "prev_search") &&
      has(e, "idx_counter");
    return hasKeys && isObj;
  } catch (e) {
    return false;
  }
};
export const fetchRecordForms = createAsyncThunk(
  "recordForms/fetchRecordForms",
  async ({
    app,
    input,
  }: FetchRecordFormsProps): Promise<WritableDraft<FetchRecordFormsResult> | null> => {
    let recordFormData: any;
    if (app.currentUser) {
      recordFormData = await app.currentUser?.callFunction(
        "search_records_public",
        input
      );
    } else {
      // const response = await realmApiCalls(input, "get", "search_records_public")
      //recordFormData = response.data
    }
    if (isFetchRecordFormsResult(recordFormData)) return recordFormData;

    return null;
  }
);
