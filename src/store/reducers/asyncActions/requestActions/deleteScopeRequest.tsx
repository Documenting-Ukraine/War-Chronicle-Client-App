import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../../realm/RealmApp";
import {
  isScopeRequest,
  ScopeRequest,
} from "../../dashboard/reviewRequests/types";

interface DeleteScopeProps {
  app: RealmApp;
  input: {
    user_request_id: string;
    scope_review_list_idx: number;
    accepted: boolean;
    last_el_id: string;
  };
}
export type { DeleteScopeProps };

interface DeleteScopeRequestResults {
  error: null;
  number_removed: number;
  scope_review_list_idx: number;
  new_last_document: ScopeRequest | null;
}
export function isDeleteScopeRequestResults(
  arg: any
): arg is DeleteScopeRequestResults {
  const isObj = isObject(arg);
  const hasKeys =
    has(arg, "scope_review_list_idx") &&
    typeof arg.user_review_list_idx === "number" &&
    has(arg, "error") &&
    has(arg, "number_removed") &&
    typeof arg.number_removed === "number";
  has(arg, "new_last_document") &&
    (!arg.new_last_document || isScopeRequest(arg.new_last_document));
  return isObj && hasKeys;
}
export type { DeleteScopeRequestResults };

export const deleteScopeRequest = createAsyncThunk(
  "dashboard/deleteUser",
  async ({
    app,
    input,
  }: DeleteScopeProps): Promise<DeleteScopeRequestResults | null> => {
    const scopeRequestData = await app.currentUser?.callFunction(
      "delete_requests",
      {...input, request_type: 'scope'}
    );
    if (isDeleteScopeRequestResults(scopeRequestData)) {
      const document = scopeRequestData.new_last_document;
      //parse to string, since objects are non-serializable
      if (document) {
        document._id = document._id.toString();
        document.creation_date = document.creation_date.toString();
      }
      return scopeRequestData;
    }
    return null;
  }
);
