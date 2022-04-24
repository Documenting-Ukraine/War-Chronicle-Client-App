import { fetchUserData } from "../../asyncActions/userActions/fetchUsers";
import { createSlice } from "@reduxjs/toolkit";
import { updateUserScope } from "../../asyncActions/userActions/updateUserScope";
import { deleteUser } from "../../asyncActions/userActions/deleteUser";
import {
  UserListReducerState,
  UserListActionPayload,
  UserListProps,
  UserListUpdateProps,
  UserListDeleteProps,
} from "../types";
const userListUpdateTemplate = (
  state: UserListReducerState,
  payload: UserListActionPayload
) => {
  if (!payload) return state;
  const userData = state.data ? [...state.data] : [];
  const userListIdx = payload.user_list_idx;
  if (userListIdx >= userData.length) return state;
  let removedArr;
  //for deletion of users
  if (!("categories_update" in payload))
    removedArr = userData.splice(userListIdx, 1);
  //for updating categories of users
  else {
    const userToUpdate = userData[userListIdx];
    const newUserDoc = {
      ...userToUpdate,
      category_scopes: payload.categories_update,
    };
    removedArr = userData.splice(userListIdx, 1, newUserDoc);
  }
  const removed = removedArr.length > 0 ? removedArr[0] : null;
  const result: UserListUpdateProps["recently_updated_user"] = {
    document: removed,
    status: "success",
  };
  state.recently_updated_user = result;
  state.data = userData;
  return state;
};
const userListSlice = createSlice({
  name: "userListSlice",
  initialState: {
    data: [],
    status: "loading",
    pagination_end: false,
    prev_search: "",
    prev_order: undefined,
    idx_counter: 0,
    recently_deleted_user: {
      document: null,
      status: "success",
    },
    recently_updated_user: {
      document: null,
      status: "success",
    },
  } as UserListProps & UserListDeleteProps & UserListUpdateProps,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.status = "loading";
      return state;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = "failed";
      console.error(state, action);
      return state;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      const success: UserListProps = {
        status: "success",
        pagination_end: action.payload ? action.payload.pagination_end : true,
        prev_search: action.payload?.prev_search
          ? action.payload.prev_search
          : "",
        prev_order: action.payload?.prev_order,
        idx_counter: action.payload?.idx_counter,
        data:
          state.data && action.payload
            ? [...state.data, ...action.payload.results]
            : !action.payload
            ? state.data
            : action.payload.results,
      };
      if (state.data && action.payload) {
        //if not paginating, the idx_counter will be less be 1 or less
        if (action.payload.idx_counter <= 1)
          success.data = action.payload.results;
        //if paginating, we have an idx_counter greater than 1
        else success.data = [...state.data, ...action.payload.results];
      } else if (!action.payload) success.data = state.data;
      else success.data = action.payload.results;
      return { ...state, ...success };
    });
    builder.addCase(updateUserScope.pending, (state, action) => {
      state.recently_updated_user.status = "loading";
      return state;
    });
    builder.addCase(updateUserScope.rejected, (state, action) => {
      state.recently_updated_user.status = "failed";
      console.error(action, "An error occured");
    });
    builder.addCase(updateUserScope.fulfilled, (state, action) => {
      return userListUpdateTemplate(state, action.payload);
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.recently_deleted_user.status = "loading";
      return state;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.recently_deleted_user.status = "failed";
      return state;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      return userListUpdateTemplate(state, action.payload);
    });
  },
});
export default userListSlice;
