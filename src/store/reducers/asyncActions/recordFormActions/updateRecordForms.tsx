import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../../realm/RealmApp";
import { RecordSubmissionType } from "../../dashboard/dashboardReducer";
import { WritableDraft } from "immer/dist/internal";
import { FormSubmssionProps } from "../../recordForms/recordFormSubmission/recordFormSubmissionReducer";
import { isErrorResponseData } from "../../../../types/generics/CustomHTTPTypes";
import serializeObjects from "../../utlilites/serializeObjects";
export type UpdateRecordFormResults = {
  error: null;
  response: {
    insertedId?: string;
    record_id?: string;
    new_document: Pick<RecordSubmissionType, "_id" | "record_type"> &
      FormSubmssionProps;
  };
};
export type UpdateRecordFormProps = {
  app: RealmApp;
  input: {
    recordId?: string;
    generalInputs: FormSubmssionProps;
    additionalInputs: FormSubmssionProps;
  };
  callback?: (e?: UpdateRecordFormResults) => void;
};

export const isUpdateRecordFormResults = (
  e: any
): e is WritableDraft<UpdateRecordFormResults> => {
  try {
    const isObj = isObject(e);
    const hasKeys =
      has(e, "error") && has(e, "response") && has(e.response, "new_document");
    return isObj && hasKeys;
  } catch (e) {
    return false;
  }
};
export const isUpdateRecordResponse = (
  e: any
): e is UpdateRecordFormResults["response"] => {
  try {
    const isObj = isObject(e);
    const hasKeys = has(e, "new_document");
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
    callback,
  }: UpdateRecordFormProps): Promise<
    WritableDraft<UpdateRecordFormResults> | null | undefined
  > => {
    try {
      const updateRecordForm = await app.currentUser?.callFunction(
        "upload_record_form_public",
        input
      );
      if (isUpdateRecordFormResults(updateRecordForm)) {
        let serializedData = {};
        if (isObject(updateRecordForm.response))
          serializedData = serializeObjects(updateRecordForm.response, true);
        if (isUpdateRecordResponse(serializedData)) {
          const newDoc = {
            ...updateRecordForm,
            response: {
              ...serializedData,
              record_id: serializedData.insertedId,
            },
          };
          if (callback) callback(newDoc);
          return newDoc;
        }
      } else if (isErrorResponseData(updateRecordForm)) throw updateRecordForm;
      return null;
    } catch (e) {
      console.error(e);
      if (isErrorResponseData(e)) throw e;
    }
  }
);
