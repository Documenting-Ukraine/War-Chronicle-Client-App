import { createAsyncThunk } from "@reduxjs/toolkit";
import { isObject, has } from "lodash";
import { RealmApp } from "../../../../realm/RealmApp";
import {
  isNewUserRequest,
  NewUserRequest,
} from "../../dashboard/reviewRequests/types";

interface DeleteNewUserRequestProps {
  app: RealmApp;
  input: {
    user_request_id: string;
    user_review_list_idx: number;
    accepted: boolean;
    last_el_id: string;
  };
}
export type { DeleteNewUserRequestProps };

interface DeleteNewUserRequestResults {
  error: null;
  number_removed: number;
  user_review_list_idx: number;
  new_last_document: NewUserRequest | null;
}
export function isDeleteNewUserRequestResults(
  arg: any
): arg is DeleteNewUserRequestResults {
  const isObj = isObject(arg);
  const hasKeys =
    has(arg, "user_review_list_idx") &&
    typeof arg.user_review_list_idx === "number" &&
    has(arg, "error") &&
    has(arg, "number_removed") &&
    typeof arg.number_removed === "number";
  has(arg, "new_last_document") &&
    (!arg.new_last_document || isNewUserRequest(arg.new_last_document));
  return isObj && hasKeys;
}
export type { DeleteNewUserRequestResults };

export const deleteNewUserRequest = createAsyncThunk(
  "dashboard/deleteNewUserRequest",
  async ({
    app,
    input,
  }: DeleteNewUserRequestProps): Promise<DeleteNewUserRequestResults | null> => {
    const newUserRequestData = await app.currentUser?.callFunction(
      "delete_requests",
      {...input, request_type: 'new_user'}
    );
    if (isDeleteNewUserRequestResults(newUserRequestData)) {
      const document = newUserRequestData.new_last_document;
      //parse to string, since objects are non-serializable
      if (document) {
        document._id = document._id.toString();
        document.creation_date = document.creation_date.toString();
      }
      return newUserRequestData;
    }
    return null;
  }
);
