import { createAsyncThunk } from "@reduxjs/toolkit";
import { RealmApp } from "../../../../realm/RealmApp";
import {
  ScopeRequestPayload,
  isScopeRequestArr,
  isScopeRequestPayload
} from "../../dashboard/reviewRequests/types";
interface FetchScopeRequestProps {
  app: RealmApp;
  input: {
    idx_counter?: number;
  };
}
export type { FetchScopeRequestProps };
export const fetchScopeRequest = createAsyncThunk(
  "dashboard/fetchScopeRequest",
  async ({
    app,
    input,
  }: FetchScopeRequestProps): Promise<ScopeRequestPayload | null> => {
    const scopeRequestData = await app.currentUser?.callFunction(
      "search_scope_request",
      input
    );
    if (
      isScopeRequestPayload(scopeRequestData) &&
      isScopeRequestArr(scopeRequestData.results)
    ) {
      const modifiedData = scopeRequestData.results.map((doc) => {
        //this step is need to make the data serializable by redux
        doc._id = doc._id.toString();
        doc.creation_date = doc.creation_date.toString()
        return doc;
      });
      scopeRequestData.results = modifiedData;
      scopeRequestData.key = "reviewNewScopeRequestSlice"
      return scopeRequestData;
    }
    return null;
  }
);
