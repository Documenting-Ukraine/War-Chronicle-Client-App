import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../../realm/RealmApp";
import { CategoriesList } from "../../../../types/dataTypes/CategoryIconMap";
import { RecordSubmissionType } from "../../dashboard/dashboardReducer";
export type UpdateRecordFormProps = {
  app: RealmApp;
  input: {
    record_form_id: string;
    record_form_type: typeof CategoriesList[number];
    update_props: Partial<RecordSubmissionType>;
  };
};
export type UpdateRecordFormResults = {
  error: null;
  record_id_idx?: number;
  new_document: RecordSubmissionType;
};
export const isUpdateRecordFormResults = (
  e: any
): e is UpdateRecordFormResults => {
  try {
    const isObj = isObject(e);
    const hasKeys = has(e, "error") && has(e, "new_document");
    return isObj && hasKeys;
  } catch (e) {
    return false;
  }
};
export const updateRecordForm = createAsyncThunk(
  "recordForms/updateRecordForm",
  async ({
    app,
    input,
  }: UpdateRecordFormProps): Promise<UpdateRecordFormResults | null> => {
    const updateRecordForm = await app.currentUser?.callFunction(
      "update_record_form",
      input
    );
    if (isUpdateRecordFormResults(updateRecordForm)) return updateRecordForm;
    else return null;
  }
);
