import { fetchUserData } from "../asyncActions/fetchUsers";
import { UserDocument } from "../../../types/dataTypes";
import { createSlice } from "@reduxjs/toolkit";
import { GenericDashboardData } from "./types";
const userListSlice = createSlice({
  name: "userListSlice",
  initialState: {
    data: null,
    status: "success",
  } as GenericDashboardData<UserDocument[]>,
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
            const success: {
                status: "success";
                data: UserDocument[] | null;
            } = {
                status: "success",
                data:
                    state.data && action.payload
                        ? [...state.data, ...action.payload]
                        : !action.payload
                            ? state.data
                            : action.payload,
            };
              return success;
            });
    }
});
export default userListSlice