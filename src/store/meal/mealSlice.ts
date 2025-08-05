import { createSlice } from "@reduxjs/toolkit";
import {
  createMealThunk,
  deleteMealThunk,
  getAllMealsAPI,
  getAllRestaurantMealsThunk,
  updateMealThunk,
} from "./mealThunks";

interface MealState {
  meals:
    | {
        _id: string;
        name: string;
        description: string;
        category: string;
        price: number;
        imageUrl: string;
        isAvailable: boolean;
      }[]
    | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: MealState = {
  meals: undefined,
  loading: false,
  error: null,
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all meals from api
    builder
      .addCase(getAllMealsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMealsAPI.fulfilled, (state, action) => {
        state.meals = action.payload.meals;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllMealsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //get all restaurant meals
    builder
      .addCase(getAllRestaurantMealsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRestaurantMealsThunk.fulfilled, (state, action) => {
        state.meals = action.payload.meals;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllRestaurantMealsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // create new meal
    builder
      .addCase(createMealThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMealThunk.fulfilled, (state, action) => {
        if (state.meals) {
          state.meals.push(action.payload.meal);
        } else {
          state.meals = [action.payload.meal];
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(createMealThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // update meal
    builder
      .addCase(updateMealThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMealThunk.fulfilled, (state, action) => {
        if (state.meals) {
          const index = state.meals.findIndex(
            (meal) => meal._id === action.payload.updatedMeal._id
          );
          if (index !== -1) {
            state.meals[index] = action.payload.updatedMeal;
          }
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateMealThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // delete meal
    builder
      .addCase(deleteMealThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMealThunk.fulfilled, (state, action) => {
        if (state.meals) {
          state.meals = state.meals.filter(
            (meal) => meal._id !== action.payload.mealId
          );
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteMealThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default mealSlice.reducer;
