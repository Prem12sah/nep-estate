import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // SIGN IN
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE USER
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateUserSuccess: (state, action) => {
      state.loading = false;

      // ✅ IMPORTANT: merge instead of replace
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };

      state.error = null;
    },

    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // CLEAR ERROR
    clearError: (state) => {
      state.error = null;
    },

    // OPTIONAL: LOGOUT (recommended)
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  clearError,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;