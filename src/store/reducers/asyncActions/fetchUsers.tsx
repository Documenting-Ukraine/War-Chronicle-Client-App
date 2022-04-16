import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../realm/RealmApp";
import { UserDocument } from "../../../types/dataTypes";
import {isCategoryScope} from "../../../types/dataTypes/CategoryIconMap"
interface FetchUserDataProps {
  app: RealmApp;
  input: {
      value: string;
      userType?: "admins" | "contributors";
      order?: {
        key: "join_date" | "name";
        direction: "descending" | "ascending";
      };
    };
}
export type {FetchUserDataProps}
export function isUserData(arg: any): arg is UserDocument[] {
  if (!arg) return false;
  const isArray = Array.isArray(arg);
  if (isArray) {
    if (!(arg[0]._id && arg[0].account_type)) return false;
    if (!arg[0].category_scopes.every((scope: string) => isCategoryScope(scope)))
      return true;
  }
  return false;
}
export const fetchUserData = createAsyncThunk(
  "dashboard/fetchUserData",
  async ({ app, input }: FetchUserDataProps): Promise<UserDocument[] | null> => {
    console.log(input)
    let userData;
    if (typeof input !== "string" && input.userType === "admins" )
      userData = await app.currentUser?.callFunction("read_admin_users", input);
    else
      userData = await app.currentUser?.callFunction(
        "read_contributor_users",
        input
      );

    // if (isUserData(userData)) return userData;
    return null;
  }
);
