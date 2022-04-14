import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../realm/RealmApp";
import { RecordSubmissionType } from "../../../types/dataTypes";

function isRecordSubmissionType(arg: any): arg is RecordSubmissionType[] {
  if (!arg) return false;
  const map = { 
    "War Crimes": true,
    "Strikes And Attacks": true,
    "Refugees And Idps": true,
    "International Response": true,
    "Media And Disinformation": true,
    "Russia": true
  }
  return arg.recordType in map
}
export const fetchContributions = createAsyncThunk(
  "dashboard/fetchContributions",
  async (app: RealmApp): Promise<RecordSubmissionType[] | null> => {
    const userData = await app.currentUser?.callFunction(
      "read_contributions"
    );
    if (isRecordSubmissionType(userData)) return userData;
    return null;
  }
);
