import { createSlice } from "@reduxjs/toolkit";
import { RecordFormReducerProps } from "./types";

const recordFormReducer = createSlice({
  name: "recordFormSlice",
  initialState: {
    searched_data: {
      data: [],
      status: "success",
    },
    selected_record: {
      status: "success",
      data: null,
    },
  } as RecordFormReducerProps,
  reducers: {},
    extraReducers: (builder) => {
        builder.addCase();
        builder.addCase();
        builder.addCase();
        builder.addCase();
        builder.addCase();
        builder.addCase();
    },
});
