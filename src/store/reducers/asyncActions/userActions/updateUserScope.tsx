import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../../realm/RealmApp";
import { GenericCategoryMap, CategoriesList, isCategoryScope } from "../../../../types/dataTypes/CategoryIconMap";
import { UserDocument } from "../../dashboard/dashboardReducer";

interface UpdateUserScopeProps {
  app: RealmApp;
  input: {
    categories: GenericCategoryMap<boolean>;
    user_list_idx: number;
  };
}
export type { UpdateUserScopeProps };

interface UpdateUserScopeResults {
  error: null;
  user_id_updated: Omit<UserDocument, "external_id" | "user_id">;
  user_list_idx: number;
  categories_update: typeof CategoriesList[number][];
}
export function isUpdateUserScopeResults(arg: any): arg is UpdateUserScopeResults {
  const isObj = isObject(arg);
    const hasKeys =
        has(arg, "user_list_idx") &&
        typeof arg.user_list_idx === "number" &&
        has(arg, "error") &&
        has(arg, "user_id_updated") &&
        typeof arg.user_id_updated === "string" &&
        has(arg, "categories_update")
        && arg.categories_update.every((key: string) => isCategoryScope(key))
  return isObj && hasKeys;
}
export type { UpdateUserScopeResults };

export const updateUserScope = createAsyncThunk(
  "dashboard/updateUserScope",
  async ({
    app,
    input,
  }: UpdateUserScopeProps): Promise<UpdateUserScopeResults | null> => {
    const userData = await app.currentUser?.callFunction("update_scopes_user", input);
    if (isUpdateUserScopeResults(userData)) return userData;
    return null;
  }
);
