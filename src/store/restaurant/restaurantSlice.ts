import { createSlice } from "@reduxjs/toolkit";
import {
  addOrUpdateRestaurantLanguagesTranslationThunk,
  createNewRestaurantAndTemplateAPI,
  deleteUserRestaurantThunk,
  getAllUserRestaurantsAPI,
  updateRestaurantCurrencyThunk,
} from "./restaurantThunk";

type Template = {
  //!! i added this type to avoid the error in the selectedTemplateId next.js build the values are not matching
  _id: string;
  name: string;
  templateUrl: string;
  templateType: string;
  templateCategory: string;
  templatePrice: number;
  purchasedBy: string[];
};

interface Restaurant {
  _id: string;
  restaurantName: string;
  businessUrl: string;
  selectedTemplateId: string | Template;
  selectedTemplate: string;
  currency: string;
  isActive: boolean;
  qrCodeUrl: string;
}

interface RestaurantState {
  selectedRestaurant: Restaurant | null;
  restaurants: Restaurant[] | null;
  loading: boolean;
  error: string | null;
  businessUrl: string | null;
}

const initialState: RestaurantState = {
  selectedRestaurant: null,
  restaurants: null,
  loading: false,
  error: null,
  businessUrl: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    resetRestaurantError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserRestaurantsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserRestaurantsAPI.fulfilled, (state, action) => {
        state.restaurants = action.payload.restaurants;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllUserRestaurantsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createNewRestaurantAndTemplateAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewRestaurantAndTemplateAPI.fulfilled, (state, action) => {
        // state.selectedRestaurant = action.payload.restaurant; //! i commenting this code because i don't think i will need to save the callback in the state if needed i will only save the restaurants since when i go to template page it will fetch the data anyways.
        // state.businessUrl = action.payload.restaurant.businessUrl;
        state.loading = false;
        state.error = null;
        if (state.restaurants) {
          state.restaurants = [...state.restaurants, action.payload.restaurant];
        } else {
          state.restaurants = [action.payload.restaurant];
        }
      })
      .addCase(createNewRestaurantAndTemplateAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle delete user restaurant
    builder
      .addCase(deleteUserRestaurantThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserRestaurantThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.restaurants) {
          state.restaurants = state.restaurants.filter(
            (restaurant) => restaurant._id !== action.payload.restaurantId
          );
        }
      })
      .addCase(deleteUserRestaurantThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(
        addOrUpdateRestaurantLanguagesTranslationThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        addOrUpdateRestaurantLanguagesTranslationThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          if (state.selectedRestaurant) {
            // Update the selected restaurant with the new language translation
            state.selectedRestaurant = {
              ...state.selectedRestaurant,
              ...action.payload.updatedRestaurant,
            };
          }
        }
      )
      .addCase(
        addOrUpdateRestaurantLanguagesTranslationThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
    builder
      .addCase(updateRestaurantCurrencyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurantCurrencyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // find and update restaurant throw restaurant id
        if (state.restaurants) {
          const updatedRestaurants = state.restaurants.map((restaurant) => {
            if (restaurant._id === action.payload.restaurantId) {
              return {
                ...restaurant,
                currency: action.payload.currency,
              };
            }
            return restaurant;
          });
          state.restaurants = updatedRestaurants;
        }

      })
      .addCase(updateRestaurantCurrencyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default restaurantSlice.reducer;

export const { resetRestaurantError } = restaurantSlice.actions;
