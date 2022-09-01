import { createAsyncThunk } from "@reduxjs/toolkit";
import { RecordSubmissionType } from "../../../types/dataTypes";
import { isFetchRecordFormsResult, FetchRecordFormsProps } from "./recordFormActions/fetchRecordForms";
export const fetchContributions = createAsyncThunk(
  "dashboard/fetchContributions",
  async ({
    app,
    input,
  }: FetchRecordFormsProps): Promise<RecordSubmissionType[] | null> => {
    const recordFormData = await app.currentUser?.callFunction(
      "search_records_public",
      input
    );
    if (isFetchRecordFormsResult(recordFormData)) return recordFormData.results;
    return null;
  }
);
