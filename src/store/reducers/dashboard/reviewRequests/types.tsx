import { GenericDashboardData } from "../types";
import { CategoriesList } from "../../../../types/dataTypes/CategoryIconMap";
export type ScopeRequest = {
  user_id: string;
  last_name: string;
  email: string;
  purpose: string;
  category: typeof CategoriesList[number];
};
export type ScopeRequestSlice = GenericDashboardData<ScopeRequest[]> & {
  key: "reviewNewScopeRequestSlice",
  pagination_end: boolean;
  idx_counter: number;
  recently_deleted: {
    document: ScopeRequest | null;
    status: "success" | "failed" | "loading";
  };
};
export type NewUserRequest = {
  first_name: string;
  last_name: string;
  email: string;
  occupation: string;
  purpose: string;
  phone_number?: string;
  preferred_contact: "E-mail" | "Phone Number";
};
export type NewUserRequestSlice = GenericDashboardData<NewUserRequest[]> & {
  key: "reviewNewUserRequestSlice",
  pagination_end: boolean;
  idx_counter: number;
  recently_deleted: {
    document: NewUserRequest | null;
    status: "success" | "failed" | "loading";
  };
};
export type NewUserRequestPayload = Omit<
  NewUserRequestSlice,
  "recently_deleted"
> & {
  results: NewUserRequest[];
};
export type ScopeRequestPayload = Omit<
  ScopeRequestSlice,
  "recently_deleted"
> & {
  results: ScopeRequest[];
};
export function isNewUserRequest(arg: any): arg is NewUserRequest {
  try {
    return arg.preferred_contact;
  } catch (e) {
    return false;
  }
}
export function isScopeRequest(arg: any): arg is ScopeRequest {
  try {
    return arg.category;
  } catch (e) {
    return false;
  }
}
export function isNewUserRequestArr(arg: any): arg is NewUserRequest[] {
  try {
    return arg.every((doc: any) => isNewUserRequest(doc));
  } catch (e) {
    return false;
  }
}
export function isScopeRequestArr(arg: any): arg is ScopeRequest[] {
  try {
    return arg.every((doc: any) => isScopeRequest(doc));
  } catch (e) {
    return false;
  }
}
export function isScopeRequestsSlice(arg: any): arg is ScopeRequestSlice{
    return arg.key === "reviewNewScopeRequestSlice"
}
export function isNewUserRequestsSlice(arg: any): arg is NewUserRequestSlice{
    return arg.key === "reviewNewUserRequestSlice"
}
export const fetchFulfilledReviewRequests = (
  state: NewUserRequestSlice | ScopeRequestSlice,
  payload: NewUserRequestPayload | ScopeRequestPayload | null
) => {
  const success: {
    status: "success";
    data: (ScopeRequest | NewUserRequest)[] | null;
  } = {
    status: "success",
    data: null,
  };
  if (state.data && payload) {
    //if not paginating, the idx_counter will be less be 1 or less
    if (payload.idx_counter <= 1) success.data = payload.results;
    //if paginating, we have an idx_counter greater than 1
    else success.data = [...state.data, ...payload.results];
  } 
  else if (!payload) success.data = state.data;
  else success.data = payload.results;
  return { ...state, ...success };
};
export const deleteFulfilledReviewRequests = (
    state: NewUserRequestSlice | ScopeRequestSlice,
    payload: NewUserRequestPayload | ScopeRequestPayload | null,
    idx: number
): NewUserRequestSlice | ScopeRequestSlice => {
  if (!payload) return state;
  const requestData = state.data ? [...state.data] : [];
  if (idx >= requestData.length) return state;
  const removedArr = requestData.splice(idx, 1);
  const removed = removedArr.length > 0 ? removedArr[0] : null;

  if(isNewUserRequestArr(requestData) && isNewUserRequest(removed) && state.key ==="reviewNewUserRequestSlice"){
      const result:{document: NewUserRequest, status: "success"} = {document: removed, status: "success"}
      return {...state, recently_deleted: result, data: requestData};
  }
  else if(isScopeRequestArr(requestData) && isScopeRequest(removed) && state.key ==="reviewNewScopeRequestSlice"){
      const result:{document: ScopeRequest, status: "success"} = {document: removed, status: "success"}
      return {...state, recently_deleted: result, data: requestData};
  }
  else return state
}; 
