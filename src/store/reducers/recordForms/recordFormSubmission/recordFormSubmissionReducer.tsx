import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { RecordSubmissionType } from "../../../../types/dataTypes";
import { isErrorResponseData } from "../../../../types/generics/CustomHTTPTypes";
import { updateRecordForm } from "../../asyncActions/recordFormActions/updateRecordForms";
import { determineSubmissionType } from "./determineSubmissionType";

export type FormSubmssionProps = Partial<RecordSubmissionType>;
type SubmissionSliceProps = {
  data: FormSubmssionProps;
  status: {
    err: {
      status: boolean;
      message: string;
    };
    loading: {
      status: boolean;
      progressNum: number;
      message: string;
    };
  };
};
export const recordFormSubmissionSlice = createSlice({
  name: "recordFormSubmissionSlice",
  initialState: {
    data: {},
    status: {
      err: {
        status: false,
        message: "",
      },
      loading: {
        status: false,
        progressNum: 0,
        message: "",
      },
    },
  } as SubmissionSliceProps,
  extraReducers: (builder) => {
    builder.addCase(updateRecordForm.pending, (state, action) => {
      return {
        ...state,
        status: {
          ...state.status,
          loading: {
            status: true,
            message: "Uploading all record content to database",
            progressNum: 80,
          },
        },
      };
    });
    builder.addCase(updateRecordForm.rejected, (state, action) => {
      const payload = action.payload;
      return {
        ...state,
        status: {
          loading: {
            status: false,
            message: "",
            progressNum: 0,
          },
          err: {
            status: true,
            message: isErrorResponseData(payload)
              ? payload.message
              : `Unknown Error. Please contact ${process.env["REACT_APP_SUPPORT_EMAIL"]}`,
          },
        },
      };
    });
    builder.addCase(updateRecordForm.fulfilled, (state, action) => {
      const payload = action.payload;
      const document = payload?.new_document;
      return {
        ...state,
        status: {
          ...state.status,
          loading: document
            ? {
                status: false,
                message: `${document.record_type} record named ${document.record_title} successfully stored`,
                progressNum: 100,
              }
            : {
                status: false,
                message: "",
                progressNum: 0,
              },
        },
      };
    });
  },
  reducers: {
    updateRecordType(
      state,
      action: PayloadAction<RecordSubmissionType["record_type"]>
    ) {
      return {
        ...state,
        data: { record_type: action.payload },
      };
    },
    updateFormProps(
      state,
      action: PayloadAction<FormSubmssionProps>
    ) {
      const copyState = cloneDeep(state.data);
      const payload = action.payload;
      if (copyState.record_type) {
        const newState = determineSubmissionType(copyState, payload);
        if(state.data.record_type === newState?.record_type)
        state.data = newState ? newState : state.data;
      }
      return state;
    },
    updateLoadingState(
      state,
      action: PayloadAction<SubmissionSliceProps["status"]["loading"]>
    ) {
      const payload = action.payload;
      return {
        ...state,
        status: {
          ...state.status,
          loading: payload,
        },
      };
    },
    updateErrorState(
      state,
      action: PayloadAction<SubmissionSliceProps["status"]["err"]>
    ) {
      const payload = action.payload;
      return {
        ...state,
        status: {
          ...state.status,
          err: payload,
        },
      };
    },
  },
});
export const {
  updateFormProps,
  updateRecordType,
  updateErrorState,
  updateLoadingState,
} = recordFormSubmissionSlice.actions;
