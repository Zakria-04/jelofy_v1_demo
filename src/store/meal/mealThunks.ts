import {
  createNewMeal,
  deleteMealAPI,
  getAllUserMealFromDB,
  getAllUserRestaurantMealsAPI,
  updateMealAPI,
} from "@/res/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const parseError = (error: any) => {
//   if (error?.response?.data) {
//     return error.response.data; // Axios-style
//   }

//   try {
//     return JSON.parse(error.message); // Standard stringified error
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
      return JSON.parse(error.message);
    }
    return { message: error.message || "Unknown error occurred." };
  } catch {
    return { message: error.message || "Unknown error occurred." };
  }
};

const getAllMealsAPI = createAsyncThunk(
  "meal/getAllMeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUserMealFromDB();
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

const createMealThunk = createAsyncThunk(
  "meal/createMeal",
  async (body: FormData, { rejectWithValue }) => {
    try {
      const response = await createNewMeal(body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAllRestaurantMealsThunk = createAsyncThunk(
  "meal/getAllRestaurantMeals",
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await getAllUserRestaurantMealsAPI(restaurantId);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

const updateMealThunk = createAsyncThunk(
  "meal/updateMeal",
  async (
    body: { selectedMealId: string; formDataToSubmit: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateMealAPI(
        body.selectedMealId,
        body.formDataToSubmit
      );
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

const deleteMealThunk = createAsyncThunk(
  "meal/deleteMeal",
  async (mealId: string, { rejectWithValue }) => {
    try {
      const response = await deleteMealAPI(mealId);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

export {
  getAllMealsAPI,
  createMealThunk,
  getAllRestaurantMealsThunk,
  updateMealThunk,
  deleteMealThunk,
};
