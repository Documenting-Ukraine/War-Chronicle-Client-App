import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../realm/RealmApp";
import { UserDocument } from "../../../types/dataTypes";
import { isCategoryScope } from "../../../types/dataTypes/CategoryIconMap";
import { UserSortProps } from "../../../pages/dashboard/utilities/userList/types";
interface FetchUserDataProps {
  app: RealmApp;
  input: {
    value: string;
    user_type?: "admin" | "contributor";
    order?: UserSortProps;
    idx_counter?: number;
  };
}
export type { FetchUserDataProps };
export function isUserData(arg: any): arg is UserDocument[] {
  if (!arg) return false;
  const isArray = Array.isArray(arg);
  if (isArray && arg.length > 0) {
    if (!(arg[0]._id && arg[0].account_type)) return false;
    if (
      !arg[0].category_scopes?.every((scope: string) => isCategoryScope(scope))
    )
      return true;
  } else if (isArray) return true;
  return false;
}
interface FetchUserDataResults {
  error: null;
  pagination_end: boolean;
  results: Omit<UserDocument, "external_id" | "user_id">[];
  prev_search: string;
  prev_order: UserSortProps | undefined;
  idx_counter: number;
}
export function isUserResults(arg: any): arg is FetchUserDataResults {
  const isObj = isObject(arg);
  const hasKeys = has(arg, "pagination_end") && has(arg, "results") && has(arg, "prev_search") && has(arg, "idx_counter");
  return isObj && hasKeys;
}
export type { FetchUserDataResults }

export const fetchUserData = createAsyncThunk(
  "dashboard/fetchUserData",
  async ({
    app,
    input,
  }: FetchUserDataProps): Promise<FetchUserDataResults | null> => {
    // let userData;
    // if (typeof input !== "string")
    //   userData = await app.currentUser?.callFunction("search_users", input);
    // if (isUserResults(userData) && isUserData(userData.results)) {
    //   const modifiedData = userData.results.map((doc) => {
    //     //this step is need to make the data serializable by redux
    //     doc._id = doc._id.toString();
    //     doc.creation_date = doc.creation_date.toString();
    //     return doc
    //   });
    //   userData.results = modifiedData
    //   return userData;
    // }
    return null;
  }
);
