import {
  createNewUserAPI,
  deleteUserAccountAPI,
  getAuthenticatedUserFromServer,
  getCurrentUserNameAPI,
  loginUserFromServer,
  updateUserInfoAPI,
  updateUserPasswordAPI,
} from "@/res/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// type BasicError = {
//   message?: string;
//   response?: {
//     data?: unknown; // or more specific type if you know the structure
//   };
//   [key: string]: unknown; // catch-all for other potential properties
// };

// const parseError = (error: BasicError) => {
//   if (error?.response?.data) {
//     return error.response.data;
//   }

//   try {
//     if (typeof error.message === "string") {
//       return JSON.parse(error.message);
//     }
//     return { message: error.message || "Unknown error occurred." };
//   } catch {
//     return { message: error.message || "Unknown error occurred." };
//   }
// };

type BasicError = {
  message?: string;
  response?: {
    data?: unknown; // or more specific type if you know the structure
  };
  [key: string]: unknown; // catch-all for other potential properties
};

const parseError = (error: BasicError) => {
  if (error?.response?.data) {
    return error.response.data;
  }

  try {
    if (typeof error.message === "string") {
      const parseE = JSON.parse(error.message);
      if (parseE?.message) {
        return parseE?.message;
      }
      return { message: parseE || "Unknown error occurred." };
    }
    return { message: error.message || "Unknown error occurred." };
  } catch {
    return { message: error.message || "Unknown error occurred." };
  }
};

// login user
export const loginUserAPI = createAsyncThunk(
  "user/login",
  async (body: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUserFromServer(body);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (
    body: {
      email: string;
      emailConfirm: string;
      password: string;
      passwordConfirm: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await createNewUserAPI(body);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

// get authenticated user
export const getAuthenticatedUserAPI = createAsyncThunk(
  "user/accessToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAuthenticatedUserFromServer();
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

export const getCurrentUserNameThunk = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUserNameAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserInfoThunk = createAsyncThunk(
  "user/updateUserInfo",
  async (body: { userName: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await updateUserInfoAPI(body);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

export const changeUserPasswordThunk = createAsyncThunk(
  "user/changeUserPassword",
  async (
    body: {
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUserPasswordAPI(body);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

export const deleteUserAccountThunk = createAsyncThunk(
  "user/deleteUserAccount",
  async (body: { password: string }, { rejectWithValue }) => {
    try {
      const response = await deleteUserAccountAPI(body);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);
