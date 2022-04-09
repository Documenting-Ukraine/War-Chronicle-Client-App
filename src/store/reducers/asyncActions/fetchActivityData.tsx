import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../realm/RealmApp";
export interface ActivityDataTemplate {
  [key: string]: number;
}

function isActivtyData(arg: any): arg is ActivityDataTemplate {
  if (!arg) return false;
  const keys = Object.keys(arg[0]);
  const check = keys.every(
    (key) => typeof arg[key] === "number" && typeof key === "string"
  );
  return check;
}
export const fetchActivityData = createAsyncThunk(
  "dashboard/fetchActivityData",
  async (app: RealmApp): Promise<ActivityDataTemplate | null> => {
    const userData = await app.currentUser?.callFunction(
      "read_past_year_activity"
    );
    if (isActivtyData(userData)) return userData;
    return null;
  }
);
