import {
  addOrUpdateRestaurantLanguagesTranslationAPI,
  changeRestaurantCurrencyAPI,
  createNewRestaurant,
  createNewRestaurantAndTemplate,
  deleteUserRestaurantAPI,
  findUserRestaurants,
} from "@/res/api";
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

export const getAllUserRestaurantsAPI = createAsyncThunk(
  "restaurant/getAllUserRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await findUserRestaurants();
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

const createNewRestaurantAPI = createAsyncThunk(
  "restaurant/createNewRestaurant",
  async (body: { restaurantName: string }, { rejectWithValue }) => {
    try {
      const response = await createNewRestaurant(body);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

const createNewRestaurantAndTemplateAPI = createAsyncThunk(
  "restaurant/createNewRestaurantAndTemplate",
  async (
    body: { restaurantName: string; templateId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await createNewRestaurantAndTemplate(body);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

const deleteUserRestaurantThunk = createAsyncThunk(
  "restaurant/deleteUserRestaurant",
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await deleteUserRestaurantAPI(restaurantId);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

const addOrUpdateRestaurantLanguagesTranslationThunk = createAsyncThunk(
  "restaurant/addNewLanguageToRestaurant",
  async (
    body: {
      restaurantId: string;
      lang: string;
      dir: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Assuming there's an API endpoint for adding a new language
      const response = await addOrUpdateRestaurantLanguagesTranslationAPI(body);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

const updateRestaurantCurrencyThunk = createAsyncThunk(
  "restaurant/updateRestaurantCurrency",
  async (
    body: { restaurantId: string; currency: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await changeRestaurantCurrencyAPI(
        body.restaurantId,
        body.currency
      );
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

export {
  createNewRestaurantAPI,
  createNewRestaurantAndTemplateAPI,
  deleteUserRestaurantThunk,
  addOrUpdateRestaurantLanguagesTranslationThunk,
  updateRestaurantCurrencyThunk,
};
