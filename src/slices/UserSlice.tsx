/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

//  TYPES
import { TUser } from "../types/Slices";

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    value: {
      userDetails: {} as TUser,
    },
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.value.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = UserSlice.actions;
