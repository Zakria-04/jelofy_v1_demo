import { createSlice } from "@reduxjs/toolkit";
import { getAllSubscriptionPlansAPI, getSelectedLanguagePlanThunk } from "./plansThunks";

interface SubscriptionPlan {
  _id: string;
  planName: string;
  nameId: string
  description: string;
  price: number;
  priceId: string;
  features: string[];
}

interface initialStateType {
  subscriptionPlans: SubscriptionPlan[];
  loading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  subscriptionPlans: [],
  loading: false,
  error: null,
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubscriptionPlansAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubscriptionPlansAPI.fulfilled, (state, action) => {
        state.subscriptionPlans = action.payload.subscriptionPlans;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllSubscriptionPlansAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getSelectedLanguagePlanThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSelectedLanguagePlanThunk.fulfilled, (state, action) => {
        state.subscriptionPlans = action.payload.subscriptionPlans;
        state.loading = false;
        state.error = null;
      })
      .addCase(getSelectedLanguagePlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default plansSlice.reducer;
