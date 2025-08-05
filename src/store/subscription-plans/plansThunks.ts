import { getAllSubscriptionPlans, getSelectedLanguagePricingPlanAPI } from "@/res/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// This thunk fetches all subscription plans from the server
export const getAllSubscriptionPlansAPI = createAsyncThunk(
  "subscriptionPlans/getAllSubscriptionPlansAPI",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllSubscriptionPlans();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSelectedLanguagePlanThunk = createAsyncThunk(
  "subscriptionPlans/getSelectedLanguagePlanThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSelectedLanguagePricingPlanAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
