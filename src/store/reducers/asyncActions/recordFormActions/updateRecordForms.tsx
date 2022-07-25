import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../../realm/RealmApp";
import { RecordSubmissionType } from "../../dashboard/dashboardReducer";
import { WritableDraft } from "immer/dist/internal";
import { FormSubmssionProps } from "../../recordForms/recordFormSubmission/recordFormSubmissionReducer";
import { isErrorResponseData } from "../../../../types/generics/CustomHTTPTypes";
export type UpdateRecordFormResults = {
  error: null;
  response: {
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
        const newDoc = {
          ...updateRecordForm,
          response: {
            ...updateRecordForm.response,
            new_document: {
              ...updateRecordForm.response.new_document,
              _id: updateRecordForm.response.new_document._id.toString(),
            },
            record_id: updateRecordForm.response.record_id?.toString(),
          },
        };
        if (callback) callback(newDoc);
        return newDoc;
      } else if (isErrorResponseData(updateRecordForm)) throw updateRecordForm;
      return null;
    } catch (e) {
      console.error(e);
      if (isErrorResponseData(e)) throw e;
    }
  }
);
