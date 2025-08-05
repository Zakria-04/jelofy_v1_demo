// import { combineReducers } from "@reduxjs/toolkit";
// import languageReducer from "./languageSlice";
// import userReducer from "./user/userSlice";
// import mealReducer from "./meal/mealSlice";
// import storeReducer from "./store/storeSlice";
// import templateReducer from "./template/templateSlice";
// import restaurantReducer from "./restaurant/restaurantSlice";
// import templateStoreReducer from "./template-store/templateStoreSlice";
// import subscriptionPlansReducer from "./subscription-plans/plansSlice";

// const rootReducer = combineReducers({
//   language: languageReducer,
//   user: userReducer,
//   meal: mealReducer,
//   store: storeReducer,
//   template: templateReducer,
//   restaurant: restaurantReducer,
//   templateStore: templateStoreReducer,
//   subscriptionPlans: subscriptionPlansReducer,
// });

// export default rootReducer;

// store/rootReducer.ts
import { AnyAction, combineReducers } from "@reduxjs/toolkit";
// import languageReducer from "./languageSlice";
import userReducer from "./user/userSlice";
import mealReducer from "./meal/mealSlice";
import storeReducer from "./store/storeSlice";
import templateReducer from "./template/templateSlice";
import restaurantReducer from "./restaurant/restaurantSlice";
import templateStoreReducer from "./template-store/templateStoreSlice";
import subscriptionPlansReducer from "./subscription-plans/plansSlice";
import languageReducer from "./language/languageSlice";
import { userLoggedOut } from "./actions";
import managerReducer from "./manager/managerSlice";

const appReducer = combineReducers({
  language: languageReducer,
  user: userReducer,
  meal: mealReducer,
  store: storeReducer,
  template: templateReducer,
  restaurant: restaurantReducer,
  templateStore: templateStoreReducer,
  subscriptionPlans: subscriptionPlansReducer,
  manager: managerReducer,
});

export type RootState = ReturnType<typeof appReducer>;

// const rootReducer = (state: RootState | undefined, action: AnyAction) => {
//   if (action.type === userLoggedOut.type) {
//     state = undefined;
//   }

//   return appReducer(state, action);
// };

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === userLoggedOut.type) {
    // Preserve only the language slice (translations or selected locale)
    const { language } = state || {};
    state = { language } as RootState;
  }

  return appReducer(state, action);
};

export default rootReducer;
