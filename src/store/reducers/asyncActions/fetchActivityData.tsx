import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../realm/RealmApp";
import { has } from "lodash";
import serializeObjects from "../utlilites/serializeObjects";
export interface ActivityData {
  _id: string;
  user_first_name: string;
  user_last_name: string;
  user_id: string;
  edit_type: "create" | "edit";
  record_form_id: string;
  edit_date: Date | string;
}
export interface ActivityDataTemplate {
  data: ActivityData[];
}
export function isActivtyData(arg: any): arg is ActivityData {
  if (!arg) return false;
  try {
    const check =
      has(arg, "_id") &&
      has(arg, "user_first_name") &&
      has(arg, "user_last_name") &&
      has(arg, "user_id") &&
      has(arg, "edit_type") &&
      has(arg, "record_form_id") &&
      has(arg, "edit_date");
    return check;
  } catch (e) {
    return false;
  }
}
export function isActivtyDataTemplate(arg: any): arg is ActivityDataTemplate {
  if (!arg) return false;
  try {
    const check = has(arg, "data");
    return check;
  } catch (e) {
    return false;
  }
}
export const fetchActivityData = createAsyncThunk(
  "dashboard/fetchActivityData",
  async (app: RealmApp): Promise<ActivityDataTemplate | null> => {
    const userData = await app.currentUser?.callFunction(
      "search_contributions"
    );
    if (!isActivtyDataTemplate(userData)) return null;
    //serialize data values
    const data = serializeObjects(userData, true);
    if (isActivtyDataTemplate(data)) return data;
    return null;
  }
);
