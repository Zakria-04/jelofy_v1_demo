import { RootState } from "../store";

export const selectMeals = (state: RootState) => state.meal.meals;
