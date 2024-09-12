/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

export const AppMechanics = createSlice({
  name: "AppMechanics",
  initialState: {
    value: {
      isSignInModalVisible: false,
      isSignUpModalVisible: false,
      isModalVisible: false,
      isCitiesModalVisible: false,
      isSearchBarVisible: false,
      isProfileModalVisible: false,
      isDeleteAccountModalVisible: false,
      isLogoutModalVisible: false,
      isNotificationsModalVisible: false,
      isDataFetchedFromBackend: false,
      isResetPasswordModalVisible: false,
      isNewPasswordModalVisible: false,
      isOtpModalVisible: false,
    },
  },
  reducers: {
    toggleOtpModal: (state, action) => {
      state.value.isOtpModalVisible = action.payload;
    },
    toggleNewPasswordModal: (state, action) => {
      state.value.isNewPasswordModalVisible = action.payload;
    },
    toggleResetPasswordModal: (state, action) => {
      state.value.isResetPasswordModalVisible = action.payload;
    },
    toggleDataFetchFromBackend: (state, action) => {
      state.value.isDataFetchedFromBackend = action.payload;
    },
    toggleNotificationsModalState: (state, action) => {
      state.value.isNotificationsModalVisible = action.payload;
    },
    toggleLogoutModalState: (state, action) => {
      state.value.isLogoutModalVisible = action.payload;
    },
    toggleDeleteAccountModalState: (state, action) => {
      state.value.isDeleteAccountModalVisible = action.payload;
    },
    toggleProfileModalState: (state, action) => {
      state.value.isProfileModalVisible = action.payload;
    },
    toggleSearchBarState: (state, action) => {
      state.value.isSearchBarVisible = action.payload;
    },
    toggleSignInModalState: (state, action) => {
      state.value.isSignInModalVisible = action.payload;
    },
    toggleSignUpModalState: (state, action) => {
      state.value.isSignUpModalVisible = action.payload;
    },
    toggleModalState: (state, action) => {
      state.value.isModalVisible = action.payload;
    },
    toggleCitiesModalState: (state, action) => {
      state.value.isCitiesModalVisible = action.payload;
    },
  },
});

export const {
  toggleOtpModal,
  toggleNewPasswordModal,
  toggleDataFetchFromBackend,
  toggleNotificationsModalState,
  toggleLogoutModalState,
  toggleDeleteAccountModalState,
  toggleSearchBarState,
  toggleSignInModalState,
  toggleModalState,
  toggleSignUpModalState,
  toggleCitiesModalState,
  toggleProfileModalState,
  toggleResetPasswordModal,
} = AppMechanics.actions;
