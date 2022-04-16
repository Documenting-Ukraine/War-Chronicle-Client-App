import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../realm/RealmApp";
import { UserDocument } from "../../../types/dataTypes";
import { isCategoryScope } from "../../../types/dataTypes/CategoryIconMap";
interface FetchUserDataProps {
  app: RealmApp;
  input: {
    value: string;
    userType?: "admins" | "contributors";
    order?: {
      key: "join_date" | "name";
      direction: "descending" | "ascending";
    };
    idIdx?: string;
  };
}
export type { FetchUserDataProps };
export function isUserData(arg: any): arg is UserDocument[] {
  if (!arg) return false;
  const isArray = Array.isArray(arg);
  if (isArray) {
    if (!(arg[0]._id && arg[0].account_type)) return false;
    if (
      !arg[0].category_scopes.every((scope: string) => isCategoryScope(scope))
    )
      return true;
  }
  return false;
}
interface FetchUserDataResults {
  pagination_end: boolean;
  results: UserDocument[];
  prev_search: string
}
function isUserResults(arg: any): arg is FetchUserDataResults {
  const isObj = isObject(arg);
  const hasKeys = has(arg, "pagination_end") && has(arg, "results") && has(arg, "prev_search");
  return isObj && hasKeys;
}
export const fetchUserData = createAsyncThunk(
  "dashboard/fetchUserData",
  async ({
    app,
    input,
  }: FetchUserDataProps): Promise<FetchUserDataResults | null> => {
    console.log(input);
    let userData;
    if (typeof input !== "string")
      userData = await app.currentUser?.callFunction("search_users", input);
    if (isUserResults(userData) && isUserData(userData.results))
      return userData;
    return null;
  }
);
