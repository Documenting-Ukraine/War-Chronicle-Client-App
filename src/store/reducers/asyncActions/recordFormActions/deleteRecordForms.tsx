import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../../realm/RealmApp";
import { RecordSubmissionType } from "../../dashboard/dashboardReducer";
import { WritableDraft } from "immer/dist/internal";
import { RecordFormSearchQuery } from "../../recordForms/types";
export type DeleteRecordProps = {
  app: RealmApp;
  input: {
    record_form_ids: string[];
    record_form_list_idx?: number;
    curr_search_query?: RecordFormSearchQuery;
  };
};
export type DeleteRecordResults = {
  error: null;
  number_removed: number;
  record_form_idx?: number;
  removed_form_ids: string[];
  new_last_documents?: RecordSubmissionType[];
};
export const isDeleteRecordResults = (
  e: any
): e is WritableDraft<DeleteRecordResults> => {
  try {
    const isObj = isObject(e);
    const hasKeys =
      has(e, "error") && has(e, "number_removed") && has(e, "removed_form_ids");
    return isObj && hasKeys;
  } catch (e) {
    return false;
  }
};
export const deleteRecordForms = createAsyncThunk(
  "recordForm/deleteRecordForms",
  async ({
    app,
    input,
  }: DeleteRecordProps): Promise<WritableDraft<DeleteRecordResults> | null> => {
    const deleteData = await app.currentUser?.callFunction(
      "delete_user",
      input
    );
    if (isDeleteRecordResults(deleteData)) return deleteData;
    else return null;
  }
);
