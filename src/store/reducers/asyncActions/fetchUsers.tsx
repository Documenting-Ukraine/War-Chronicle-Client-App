import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../realm/RealmApp";
import { UserDocument } from "../types";
interface FetchDataProps {
  app: RealmApp;
  input:
    | string
    | (Object & {
        value: string;
        userType?: "admin" | "contributor";
        order?: {
          key: "joinDate" | "name";
          direction: "descending" | "ascending";
        };
      });
}
function isUserData(arg: any): arg is UserDocument[] {
  if (!arg) return false;
  const isArray = Array.isArray(arg);
  if (isArray) {
    if (arg[0]._id && arg[0].account_type) return true;
  }
  return false;
}
export const fetchUserData = createAsyncThunk(
  "dashboard/fetchUserData",
  async ({ app, input }: FetchDataProps): Promise<UserDocument[] | null> => {
    let userData;
    if (typeof input !== "string" && input.userType === "admin" )
      userData = await app.currentUser?.callFunction("read_admin_users", input);
    else
      userData = await app.currentUser?.callFunction(
        "read_contributor_users",
        input
      );

    if (isUserData(userData)) return userData;
    return null;
  }
);
