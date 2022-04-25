import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../../realm/RealmApp";

interface DeleteUserProps {
  app: RealmApp;
    input: {
        user_list_idx: number, 
        user_id: string
  };
}
export type { DeleteUserProps };

interface DeleteUserResults {
    error: null;
    number_removed: number;
    user_list_idx: number;
}
export function isDeleteUserResults(arg: any): arg is DeleteUserResults {
  const isObj = isObject(arg);
  const hasKeys =
    has(arg, "user_list_idx") && typeof arg.user_list_idx === "number"  && 
    has(arg, "error") && 
    has(arg, "number_removed") && typeof arg.number_removed === "number"
  return isObj && hasKeys;
}
export type { DeleteUserResults };

export const deleteUser = createAsyncThunk(
  "dashboard/deleteUser",
  async ({
    app,
    input,
  }: DeleteUserProps): Promise<DeleteUserResults | null> => {
    const userData = await app.currentUser?.callFunction("delete_user", input);
    if (isDeleteUserResults(userData)) return userData;
    return null;
  }
);
