import { createAsyncThunk } from "@reduxjs/toolkit";
import { ObjectId } from "mongodb";
import { RealmApp } from "../../../../realm/RealmApp";
import { CategoriesList } from "../../../../types/dataTypes/CategoryIconMap";
import { RecordSubmissionType } from "../../dashboard/dashboardReducer";
import { isObject, has } from "lodash";
export type RecordFormSearchQuery = {
    [key: string]: any;
    value: string;
    _ids?: string[];
    title?: string;
    categories?: typeof CategoriesList[number];
    date?: {
      timeFrame: "before" | "after";
      dateValue: Date | string;
    };

}
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
  prev_search: string;
  idx_counter: number;
};
export const isFetchRecordFormsResult = (
  e: any
): e is FetchRecordFormsResult => {
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
  }: FetchRecordFormsProps): Promise<FetchRecordFormsResult | null> => {
    const recordFormData = await app.currentUser?.callFunction(
      "search_record_forms",
      input
    );
    if (isFetchRecordFormsResult(recordFormData)) return recordFormData;
    return null;
  }
);
