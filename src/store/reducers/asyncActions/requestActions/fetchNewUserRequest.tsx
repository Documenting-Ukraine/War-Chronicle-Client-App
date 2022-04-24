import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../../realm/RealmApp";
import {
  isNewUserRequestArr,
  NewUserRequestPayload,
  isNewUserRequestPayload,
} from "../../dashboard/reviewRequests/types";
interface FetchNewUserRequestProps {
  app: RealmApp;
  input: {
    idx_counter?: number;
  };
}
export type { FetchNewUserRequestProps };

export const fetchNewUserRequest = createAsyncThunk(
  "dashboard/fetchNewUserRequest",
  async ({
    app,
    input,
  }: FetchNewUserRequestProps): Promise<NewUserRequestPayload | null> => {
    const newUserRequestData = await app.currentUser?.callFunction(
      "search_new_user_request",
      input
    );
    if (
      isNewUserRequestPayload(newUserRequestData) &&
      isNewUserRequestArr(newUserRequestData.results)
    ) {
      const modifiedData = newUserRequestData.results.map((doc) => {
        //this step is need to make the data serializable by redux
        doc._id = doc._id.toString();
        doc.creation_date = doc.creation_date.toString();
        return doc;
      });
      newUserRequestData.results = modifiedData;
      //add unique key
      newUserRequestData.key = "reviewNewUserRequestSlice";
      return newUserRequestData;
    }
    return null;
  }
);
