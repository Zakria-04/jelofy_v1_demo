import { getProductDetails, getRestaurantMenu } from "@/res/api";
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
      return JSON.parse(error.message);
    }
    return { message: error.message || "Unknown error occurred." };
  } catch {
    return { message: error.message || "Unknown error occurred." };
  }
};

export const getRestaurantMenuAPI = createAsyncThunk(
  "restaurant/menu",
  async (restaurantSlug: string, { rejectWithValue }) => {
    try {
      const response = await getRestaurantMenu(restaurantSlug);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);

export const getProductDetailsAPI = createAsyncThunk(
  "product/details",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await getProductDetails(productId);
      return response;
    } catch (error) {
      return rejectWithValue(parseError(error as BasicError));
    }
  }
);
