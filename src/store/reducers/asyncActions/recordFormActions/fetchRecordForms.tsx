import { createAsyncThunk } from "@reduxjs/toolkit";
import { ObjectId } from "mongodb";
import { RealmApp } from "../../../../realm/RealmApp";
import { RecordSubmissionType } from "../../dashboard/dashboardReducer";
import { isObject, has } from "lodash";
import { WritableDraft } from "immer/dist/internal";
import { RecordFormSearchQuery } from "../../recordForms/types";
import realmApiCalls from "../../../../helperFunctions/realmApiCalls";
import serializeObjects from "../../utlilites/serializeObjects";
export const oldestFormDate = new Date("1970-01-01 00:00:00 UTC+00");

export type FetchRecordFormsProps = {
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
export const serializeResults = (e: WritableDraft<FetchRecordFormsResult>) => {
  if (!e.results) return e;
  const newData = e.results.map((a) => serializeObjects(a, true));
  const newResults = { ...e };
  newResults.results = newData;
  if (isFetchRecordFormsResult(newResults)) return newResults;
  else return e;
};
export const fetchRecordFormData = async ({
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
    const response = await realmApiCalls(
      { search_query: JSON.stringify(input) },
      "get",
      "search_record_forms"
    );
    recordFormData = response.data;
  }
  if (isFetchRecordFormsResult(recordFormData))
    return serializeResults(recordFormData);
  return null;
};
export const fetchRecordForms = createAsyncThunk(
  "recordForms/fetchRecordForms",
  fetchRecordFormData
);
