import {
  UserListReducerState,
  UserListActionPayload,
  UserListProps,
  UserListUpdateProps,
  UserListDeleteProps,
} from "./userList/types";

export type GenericDashboardData<T> = {
  data: T | null;
  status: "success" | "loading" | "failed";
};
export type {
  UserListReducerState,
  UserListActionPayload,
  UserListProps,
  UserListUpdateProps,
  UserListDeleteProps
};
