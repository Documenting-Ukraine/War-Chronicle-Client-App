import { createAsyncThunk } from "@reduxjs/toolkit";
import { ObjectId } from "mongodb";
import { RealmApp } from "../../../../realm/RealmApp";
import { CategoriesList } from "../../../../types/dataTypes/CategoryIconMap";
import { RecordSubmissionType } from "../../dashboard/dashboardReducer";
type FetchRecordFormsProps = {
  app: RealmApp;
  input: {
    searchQuery: {
      [key: string]: any;
      value: string;
      _ids?: string[];
      title?: string;
      categories?: typeof CategoriesList[number];
      date?: {
        timeFrame: "before" | "after";
        dateValue: Date | string;
      };
    };
    idx_counter?: number;
    pagination_idx?: string | ObjectId;
  };
};

export const fetchRecordForms = createAsyncThunk(
  "recordForms/fetchRecordForms",
  async ({
    app,
    input,
  }: FetchRecordFormsProps): Promise<RecordSubmissionType[]| null> => {
    const recordFormData = await app.currentUser?.callFunction("search_record_forms", input);
    if(recordFormData.every((e) => e.))
    return null;
  }
);
