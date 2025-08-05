import { createSlice } from "@reduxjs/toolkit";
import { getProductDetailsAPI, getRestaurantMenuAPI } from "./storeThunks";

export type Meals = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  unit: string;
  image: string;
  imageUrl: string;
  translations: {
    [key: string]: {
      name: string;
      description: string;
      category: string;
      unit: string;
    };
  };
  size: {
    size: string;
    price: number;
    quantity: number;
  }[];
};

export type Template = {
  _id?: string;
  header: {
    backgroundColor: { color: string };
    logoText: { name: string; color: string };
    contactInformation: {
      color: string;
      iconColor: string;
      enabled: boolean;
      name: string;
      phone: string;
    };
    logoUrl: { url: string };
  };

  category: {
    backgroundColor: { color: string; disable?: boolean };
    backgroundColorSelected: { color: string };
    border: { size: string; color: string };
    borderSelected: { size: string; color: string };
    textColor: { color: string };
    textColorSelected: { color: string };
    enabled: boolean;
  };

  mealsContainer: {
    backgroundColor: { color: string };
    mealBorder: { size: string; color: string };
    mealDescription: { color: string };
    mealName: { color: string };
    mealPrice: { color: string };
    mealSize: { color: string; border: string };
    // mealQuantity: { color: string };
  };
  backgroundColor: { color: string };

  languageModal: {
    backgroundColor: { color: string };
    textColor: { color: string };
  };
};

type SelectedMeal = {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  size: {
    price: number;
    size: string;
    quantity: number;
  }[];
};

interface StoreState {
  selectedTemplate: string | undefined;
  template: Template | undefined;
  meals: Meals[];
  selectedMeal: SelectedMeal | undefined;
  isDemo: boolean;
  loading: boolean;
  error: string | null;
  businessUrl: string | null;
  restaurantId: string | null;
  restaurantLanguages: { lang: string; dir: string; iconUrl: string }[] | null;
  isActive: boolean;
  currency: string | undefined;
  restaurantName: string;
  category: string[];
  bookmarkedMeals: Meals[];
}

const initialState: StoreState = {
  selectedTemplate: undefined,
  template: undefined,
  meals: [],
  isDemo: false,
  selectedMeal: undefined,
  businessUrl: null,
  currency: undefined,
  loading: false,
  error: null,
  restaurantId: null,
  restaurantLanguages: null,
  isActive: false,
  restaurantName: "Jelofy",
  category: [],
  bookmarkedMeals: [],
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setIsDemo(state, action) {
      state.template = action.payload;
    },
    setMeals(state, action) {
      state.meals = action.payload;
    },

    setBookmarkedMeals(state, action) {
      state.bookmarkedMeals = action.payload;
    },

    deleteBookmarkedMeal(state, action) {
      state.bookmarkedMeals = state.bookmarkedMeals.filter(
        (meal) => meal._id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    // getRestaurantMenuAPI
    builder
      .addCase(getRestaurantMenuAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurantMenuAPI.fulfilled, (state, action) => {
        state.isActive = action.payload.isActive;
        state.template = action.payload.template;
        state.meals = action.payload.meals;
        state.restaurantId = action.payload.restaurantId;
        state.restaurantLanguages = action.payload.restaurantLanguages;
        state.restaurantName = action.payload.restaurantName;
        state.currency = action.payload.currency;
        state.loading = false;
        state.error = null;

        // add unique categories
        const uniqueCategories = Array.from(new Set(action.payload.meals.map((meal: Meals) => meal.category)));
        state.category = uniqueCategories as string[];
      })
      .addCase(getRestaurantMenuAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // getProductDetailsAPI
    builder
      .addCase(getProductDetailsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetailsAPI.fulfilled, (state, action) => {
        state.template = action.payload.template;
        state.selectedMeal = action.payload.selectedMeal;

        state.loading = false;
        state.error = null;
      })
      .addCase(getProductDetailsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default storeSlice.reducer;

export const { setIsDemo, setMeals, setBookmarkedMeals, deleteBookmarkedMeal } = storeSlice.actions;
