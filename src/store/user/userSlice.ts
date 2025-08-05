// src/store/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteUserAccountThunk,
  getAuthenticatedUserAPI,
  getCurrentUserNameThunk,
  loginUserAPI,
  registerUserThunk,
  updateUserInfoThunk,
} from "./userThunks";
import Cookies from "js-cookie";

interface UserState {
  user: {
    id: string | undefined;
    // userName: string | undefined;
    user:
      | {
          userName: string | undefined;
          email: string;
          _id: string;
          authProvider: string;
        }
      | undefined;
    email: string | undefined;
    purchasedTemplates: string[];
  };
  accessToken: string | undefined;
  refreshToken: string | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    id: undefined,
    user: undefined,
    email: undefined,
    purchasedTemplates: [],
  },
  accessToken: undefined,
  refreshToken: undefined,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        id: undefined,
        user: undefined,
        email: undefined,
        purchasedTemplates: [],
      };
      state.accessToken = undefined;
      state.refreshToken = undefined;
      Cookies.remove("user");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{
        user: UserState["user"];
        accessToken?: string;
        refreshToken?: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(loginUserAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAPI.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.loading = false;
        state.error = null;

        // Store the tokens and user data in cookies
        // Cookies.set("accessToken", accessToken, { expires: 1 });
        // Cookies.set("refreshToken", refreshToken, { expires: 1 });
        // Cookies.set("user", JSON.stringify(user), { expires: 1 });
      })
      .addCase(loginUserAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.user = action.payload.user;
        state.loading = true;
        state.error = null;

        // Store the tokens and user data in cookies
        // Cookies.set("accessToken", accessToken, { expires: 1 });
        // Cookies.set("refreshToken", refreshToken, { expires: 1 });
        // Cookies.set("user", JSON.stringify(user), { expires: 1 });
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // get authenticated user
    builder
      .addCase(getAuthenticatedUserAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuthenticatedUserAPI.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAuthenticatedUserAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // get current user name
    builder
      .addCase(getCurrentUserNameThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUserNameThunk.fulfilled, (state, action) => {
        state.user.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCurrentUserNameThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateUserInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(updateUserInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteUserAccountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccountThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = {
          id: undefined,
          user: undefined,
          email: undefined,
          purchasedTemplates: [],
        };
        state.accessToken = undefined;
        state.refreshToken = undefined;
      })
      .addCase(deleteUserAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;

export const { logout, userLoggedIn } = userSlice.actions;
