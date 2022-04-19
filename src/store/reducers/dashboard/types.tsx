import { WritableDraft } from "immer/dist/internal";
import {UpdateUserScopeResults,
} from "../asyncActions/userActions/updateUserScope";
 import {DeleteUserResults,
} from "../asyncActions/userActions/deleteUser";
import { UserSortProps } from "../../../pages/dashboard/utilities/userList/types";
import { UserDocument } from "../../../types/dataTypes";

export type GenericDashboardData<T> = {
  data: T | null;
  status: "success" | "loading" | "failed";
};
//user list dashboard reducer
export type UserListReducerState = WritableDraft<
  UserListProps & UserListDeleteProps & UserListUpdateProps
>;

export type UserListActionPayload = UpdateUserScopeResults | DeleteUserResults | null;

export type UserListProps = GenericDashboardData<
  Omit<UserDocument, "external_id" | "user_id">[]
> & {
  pagination_end: boolean;
  prev_search: string;
  idx_counter?: number;
  prev_order: UserSortProps;
};
export type UserListUpdateProps = {
  recently_updated_user: {
    document: Omit<UserDocument, "external_id" | "user_id"> | null;
    status: "success" | "loading" | "failed";
  };
};
export type UserListDeleteProps = {
  recently_deleted_user: {
    document: Omit<UserDocument, "external_id" | "user_id"> | null;
    status: "success" | "loading" | "failed";
  };
};
