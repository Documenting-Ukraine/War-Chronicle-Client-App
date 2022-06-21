import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { RecordSubmissionType } from "../../../../types/dataTypes";
import { determineSubmissionType } from "./determineSubmissionType";
export type RecordFormSubmssionProps = Partial<RecordSubmissionType>;
export const recordFormSubmissionSlice = createSlice({
  name: "recordFormSubmissionSlice",
  initialState: {} as RecordFormSubmssionProps,
  reducers: {
    updateRecordType(
      state,
      action: PayloadAction<RecordSubmissionType["record_type"]>
    ) {
      return { record_type: action.payload };
    },
    updateFormProps(state, action: PayloadAction<RecordFormSubmssionProps>) {
      const copyState = cloneDeep(state);
      const payload = action.payload;
      if (copyState.record_type && payload.record_type)
        return determineSubmissionType(copyState, payload);
      return state;
    },
  },
});
export const { updateFormProps, updateRecordType } =
  recordFormSubmissionSlice.actions;