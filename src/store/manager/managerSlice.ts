import { createSlice } from "@reduxjs/toolkit";
import {
  loginMangerAccountThunk,
  toggleManagerMealAvailabilityThunk,
} from "./managerThunk";

interface ManagerState {
  loading: boolean;
  error: string | null;
  meals:
    | {
        _id: string;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        isAvailable: boolean;
      }[]
    | undefined;
}

const initialState: ManagerState = {
  //   manager: undefined,
  meals: undefined,
  loading: false,
  error: null,
};

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginMangerAccountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginMangerAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.meals = action.payload.meals; // Assuming the payload contains meals data
        // Assuming the action payload contains the manager data
        // state.manager = action.payload.manager;
      })
      .addCase(loginMangerAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Assuming the payload is a string error message
      });

    builder
      .addCase(toggleManagerMealAvailabilityThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        toggleManagerMealAvailabilityThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          // Update the meals array with the toggled meal
          if (state.meals) {
            const updatedMeals = state.meals.map((meal) =>
              meal._id === action.payload._id
                ? { ...meal, isAvailable: action.payload.isAvailable }
                : meal
            );
            state.meals = updatedMeals;
          }
        }
      )
      .addCase(toggleManagerMealAvailabilityThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default managerSlice.reducer;
