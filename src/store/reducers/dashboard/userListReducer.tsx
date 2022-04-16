import { fetchUserData } from "../asyncActions/fetchUsers";
import { UserDocument } from "../../../types/dataTypes";
import { createSlice } from "@reduxjs/toolkit";
import { GenericDashboardData } from "./types";
  let userList: UserDocument[] = [];
for (let i = 0; i < 1; i++) {
      const newDate = new Date()
    const userDoc: UserDocument = {
      _id: i.toString(),
      occupation: "teacher",
      first_name: "Arky",
      last_name: "Asmal",
      email: "arkyasmal@gmail.com",
      email_verified: true,
      creation_date: new Date().toString(),
      account_type: "contributor",
      category_scopes: ["War Crimes", "Strikes and Attacks"],
      external_id: i.toString(),
      user_id: i.toString(),
    };
    userList.push(userDoc);
  }
const userListSlice = createSlice({
  name: "userListSlice",
  initialState: {
    data: userList,
    status: "success",
    paginationEnd: true,
    prevSearch: ""
  } as GenericDashboardData<UserDocument[]> & {paginationEnd: boolean, prevSearch: string},
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
            const success: GenericDashboardData<UserDocument[]> & {
                paginationEnd: boolean;
                prevSearch: string;
            } = {
              status: "success",
              paginationEnd: action.payload?.pagination_end?true:false,
              prevSearch: action.payload?.prev_search? action.payload.prev_search: "",
              data:
                state.data && action.payload
                  ? [...state.data, ...action.payload.results]
                  : !action.payload
                  ? state.data
                  : action.payload.results,
            };
              return success;
            });
    }
});
export default userListSlice