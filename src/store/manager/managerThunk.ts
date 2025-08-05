import { loginManagerAccountAPI, toggleManagerMealAvailabilityAPI } from "@/res/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

const loginMangerAccountThunk = createAsyncThunk(
  "manager/loginManagerAccount",
  async (body: { userName: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginManagerAccountAPI(body);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

const toggleManagerMealAvailabilityThunk = createAsyncThunk(
  "manager/toggleManagerMealAvailability",
  async (body: {mealID: string}, { rejectWithValue }) => {
    try {
      // Assuming you have an API endpoint to toggle meal availability
      const response = await toggleManagerMealAvailabilityAPI(body)
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

export { loginMangerAccountThunk, toggleManagerMealAvailabilityThunk };
