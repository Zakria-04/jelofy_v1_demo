import axios, { AxiosError } from "axios";
import cookies from "js-cookie";

// This is the main domain of the server
// export const MainDomain = "https://api.jelofy.com";
export const MainDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

// export const frontendDomain = "https://www.jelofy.com";
export const frontendDomain = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;

// This is the access token of the user

// Locale is used to get the language of the user
const locale = cookies.get("JELOFY_LOCALE");

// This function is used to login a user from the server
const loginUserFromServer = (body: { email: string; password: string }) => {
  const route = "/login";
  return appFetch(route, "POST", body);
};

// This function is used to get the authenticated user from the server
const getAuthenticatedUserFromServer = () => {
  const route = "/auth/user";
  return appFetch(route, "GET");
};

// This function is used to get all the meals of a user from the database
// The token is the JWT token of the user
const getAllUserMealFromDB = () => {
  const route = "/meals";
  return appFetch(route, "GET");
};

// This function is used to get the menu of a restaurant
// The restaurantSlug is the unique identifier of the restaurant
const getRestaurantMenu = (restaurantSlug: string) => {
  const route = `/store/${restaurantSlug}`;
  return appFetch(route, "GET");
};

// This function is used to get the details of a product
// The productId is the unique identifier of the product
const getProductDetails = (productId: string) => {
  const route = `/meal/${productId}`;
  return appFetch(route, "GET");
};

// This function is used to find the selected theme
// The templateId is the unique identifier of the template
const findSelectedTheme = (themeId: string) => {
  const route = `/selectedTheme/${themeId}`;
  return appFetch(route, "GET");
};

// This function is used to find the restaurants of a user
// The accessToken is the JWT token of the user
const findUserRestaurants = () => {
  const route = "/findUserRestaurants";
  return appFetch(route, "GET");
};

// This function is used to get all the store templates
const getAllStoreTemplates = () => {
  const route = "/getAllStoreTemplates";
  return appFetch(route, "GET");
};

// This function is used to get all the subscription plans
const getAllSubscriptionPlans = () => {
  const route = "/getAllSubscriptionPlans";
  return appFetch(route, "GET");
};

// This function is used to create a new meal
// The body is the FormData object that contains the meal data
const createNewMeal = (body: FormData) => {
  const route = `/create-meal`;
  return appFetch(route, "POST", body);
};

// This function is used to create a new restaurant
const createNewRestaurant = (body: { restaurantName: string }) => {
  const route = "/createRestaurant";
  return appFetch(route, "POST", body);
};

// This function is used to get all the templates owned by the user
const getAllUserOwnedTemplates = () => {
  const route = "/getAllUserOwnedTemplates";
  return appFetch(route, "GET");
};

// This function is used to purchase a template
const purchaseTemplateAPI = (templateId: string) => {
  const route = `/purchaseTemplate/${templateId}`;
  return appFetch(route, "POST");
};

// This function is used to get the template UI configuration
const getTemplateUiConfigAPI = (templateName: string) => {
  const route = `/getTemplateUiConfig?templateName=${templateName}`;
  return appFetch(route, "GET");
};

// This function is used to create a new restaurant and template
const createNewRestaurantAndTemplate = (body: { restaurantName: string }) => {
  const route = "/createRestaurantAndTemplate";
  return appFetch(route, "POST", body);
};

// This function is used to update a template
const updateTemplateAPI = ({
  templateId,
  theme,
}: {
  templateId: string;
  theme: Record<string, unknown>;
}) => {
  const route = `/updateTemplate/${templateId}`;
  return appFetch(route, "PATCH", { theme: theme });
};

// This function is used to get the current user name
const getCurrentUserNameAPI = () => {
  const route = "/getCurrentUser";

  return appFetch(route, "GET");
};

// This function is used to get the current user subscription plan
const getCurrentUserSubscriptionPlanAPI = () => {
  const route = "/getCurrentUserSubscriptionPlan";
  return appFetch(route, "GET");
};

// This function is used to create a new manager account
const createNewManagerAccountAPI = (body: {
  userName: string;
  password: string;
}) => {
  const route = "/createManager";
  return appFetch(route, "POST", body);
};

// This function is used to get the owner managers
const getOwnerManagersAPI = () => {
  const route = "/getOwnerManagers";
  return appFetch(route, "GET");
};

// This function is used to logout the user
const logoutUserAPI = () => {
  const route = "/logout";
  return appFetch(route, "POST");
};

// This function is used to toggle the restaurant activation status
const toggleRestaurantActivationAPI = (restaurantId: string) => {
  const route = `/toggleRestaurantActiveStatus/${restaurantId}`;
  return appFetch(route, "PATCH");
};

// This function is used to update a meal
const updateMealAPI = (mealId: string, body: FormData) => {
  const route = `/updateMeal/${mealId}`;
  return appFetch(route, "PATCH", body);
};

// This function is used to delete a meal
const deleteMealAPI = (mealId: string) => {
  const route = `/deleteMeal/${mealId}`;
  return appFetch(route, "DELETE");
};

// This function is used to check if the server is running
const checkServerHealthAPI = () => {
  const route = "/server-health";
  return appFetch(route, "GET");
};

// This function is used to get all the meals of a restaurant
const getAllUserRestaurantMealsAPI = (restaurantId: string) => {
  const route = `/getAllUserRestaurantMeals/${restaurantId}`;
  return appFetch(route, "GET");
};

// This function is used to get the selected language
const getSelectedLanguageAPI = () => {
  const browserLocale = navigator.language.slice(0, 2);
  const route = `/getLanguage/${locale || browserLocale || "en"}`;
  return appFetch(route, "GET");
};

// This function is used to create a new user
const createNewUserAPI = (body: {
  email: string;
  password: string;
  passwordConfirm: string;
  emailConfirm: string;
}) => {
  const route = "/register";
  return appFetch(route, "POST", body);
};

// This function is used to update the user name
const updateUserNameAPI = (body: { userName: string }) => {
  const route = "/updateUserName";
  return appFetch(route, "PATCH", body);
};

// This function is used to update the restaurant details
const updateRestaurantDetailsAPI = (
  body: { restaurantName: string; businessUrl: string },
  restaurantId: string
) => {
  const route = `/updateRestaurantDetails/${restaurantId}`;
  return appFetch(route, "PATCH", body);
};

// This function is used to get the selected language pricing plan
const getSelectedLanguagePricingPlanAPI = () => {
  const route = `/getSelectedLanguageSubscriptionPlans/${locale || "en"}`;
  return appFetch(route, "GET");
};

// This function is used to get the selected language
const checkIfUserAlreadyLoggedInAPI = () => {
  const route = "/checkIfUserLoggedIn";
  return appFetch(route, "GET");
};

// This function is used to add or update the meal languages translation
const addMealsLanguagesTranslationAPI = (body: {
  mealId: string;
  lang: string;
  dir: string;
  translation: { name: string; description: string; category: string };
}) => {
  const { mealId, lang, dir, translation } = body;
  const route = `/meal/${mealId}/translation`;
  return appFetch(route, "PATCH", { lang, dir, translation });
};

// This function is used to add or update the restaurant languages translation
const addOrUpdateRestaurantLanguagesTranslationAPI = (body: {
  restaurantId: string;
  lang: string;
  dir: string;
}) => {
  const { restaurantId, lang, dir } = body;
  const route = `/addOrUpdateRestaurantLanguages/${restaurantId}`;
  return appFetch(route, "PATCH", { lang, dir });
};

// This function is used to get the selected language
const deleteRestaurantLanguageAPI = (body: {
  restaurantId: string;
  lang: string;
}) => {
  const { restaurantId, lang } = body;
  const route = `/deleteRestaurantLanguage/${restaurantId}`;
  return appFetch(route, "DELETE", { lang });
};

// This function is used to get demo meals
const getDemoMealsAPI = () => {
  const route = "/demoMeals";
  return appFetch(route, "GET");
};

// This function is used to delete a manager
const deleteManagerAPI = (managerId: string) => {
  const route = `/deleteManager/${managerId}`;
  return appFetch(route, "DELETE");
};

// This function is used to update manager details
const updateManagerDetailsAPI = (
  managerId: string,
  body: {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
  }
) => {
  const route = `/updateManagerDetails/${managerId}`;
  return appFetch(route, "PATCH", body);
};

// this function is to delete a user's restaurant
const deleteUserRestaurantAPI = (restaurantId: string) => {
  const route = `/deleteUserRestaurant/${restaurantId}`;
  return appFetch(route, "DELETE");
};

// This function is used to check if a URL already exists
const checkIfUrlExistsAPI = (businessUrl: string) => {
  const route = `/check-url?businessUrl=${businessUrl}`;
  return appFetch(route, "GET");
};

// This function is used to login a manager account
const loginManagerAccountAPI = (body: {
  userName: string;
  password: string;
}) => {
  const route = "/login-manager";
  return appFetch(route, "POST", body);
};

// This function is used to update the selected language of a restaurant
const updateSelectedLanguageAPI = (restaurantId: string, body: FormData) => {
  const route = `/updateRestaurantSelectedLanguage/${restaurantId}`;
  return appFetch(route, "PATCH", body);
};

// This function is used to update the user information
const updateUserInfoAPI = (body: { userName: string; email: string }) => {
  const route = "/updateUserInfo";
  return appFetch(route, "PATCH", body);
};

const updateUserPasswordAPI = (body: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const route = "/updateUserPassword";
  return appFetch(route, "PATCH", body);
};

const deleteUserAccountAPI = (body: { password: string }) => {
  const route = "/deleteUserAccount";
  return appFetch(route, "DELETE", body);
};

const sendEmailSupportAPI = (body: {
  name: string;
  email: string;
  message: string;
  subject?: string;
}) => {
  const route = "/sendEmailSupport";
  return appFetch(route, "POST", body);
};

const createSubscriberAPI = (body: { email: string }) => {
  const route = "/subscribe";
  return appFetch(route, "POST", body);
};

const toggleManagerMealAvailabilityAPI = (body: { mealID: string }) => {
  const route = `/toggleMealAvailability`;
  return appFetch(route, "PATCH", body);
};

const updateRestaurantLogoAPI = (templateId: string, body: FormData) => {
  const route = `/updateRestaurantLogo/${templateId}`;
  return appFetch(route, "PATCH", body);
};

const updateSubscriptionPlanAPI = (planId: string) => {
  const route = `/subscriptionPlanConformationAndUpdate/${planId}`;
  return appFetch(route, "POST");
};

const saveCheckoutIdAPI = (checkoutId: string, planName: string) => {
  const route = `/saveCheckoutId`;
  return appFetch(route, "POST", { checkoutId, planName });
};

const changeRestaurantCurrencyAPI = (
  restaurantId: string,
  currency: string
) => {
  const route = `/updateRestaurantCurrency/${restaurantId}`;
  return appFetch(route, "PATCH", { currency });
};

const applyTemplate = (templateName: string, restaurantId: string) => {
  const route = "/useTemplateOnRestaurant";
  return appFetch(route, "POST", { templateName, restaurantId });
};

// This function is used to fetch data from the server
// It is a generic function that can be used to fetch data from any route

// const appFetch = async (
//   route: string,
//   method: "GET" | "POST" | "PATCH" | "DELETE",
//   body?: Record<string, unknown> | FormData,
//   headers?: Record<string, string>
// ) => {
//   // 1. Add default headers for CORS and credentials
//   const defaultHeaders = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     ...headers,
//   };

//   try {
//     const serverResponse = await axios({
//       method,
//       url: MainDomain + route,
//       data: method !== "GET" ? body : undefined,
//       headers: defaultHeaders,
//       withCredentials: true, // Correctly set
//       xsrfCookieName: "XSRF-TOKEN", // Optional CSRF protection
//       xsrfHeaderName: "X-XSRF-TOKEN",
//     });

//     return serverResponse.data;
//   } catch (error: unknown) {
//     const axiosError = error as AxiosError;

//     // 2. Enhanced 403 handling
//     if (axiosError?.response?.status === 403) {
//       try {
//         // 3. Important: Clear existing cookies before refresh
//         document.cookie =
//           "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//         document.cookie =
//           "refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

//         // 4. Add timeout for slow networks
//         const refreshResponse = await axios.post(
//           `${MainDomain}/user/refresh-token`,
//           {},
//           {
//             withCredentials: true,
//             timeout: 5000, // 5 second timeout
//           }
//         );

//         // 5. Verify new tokens were set
//         if (!refreshResponse.headers["set-cookie"]) {
//           throw new Error("No cookies set in refresh response");
//         }

//         // 6. Retry with delay
//         await new Promise((resolve) => setTimeout(resolve, 100));
//         const retryRes = await axios({
//           method,
//           url: MainDomain + route,
//           data: method !== "GET" ? body : undefined,
//           headers: defaultHeaders,
//           withCredentials: true,
//         });

//         return retryRes.data;
//       } catch (refreshError) {
//         console.error("Refresh token failed", refreshError);

//         // 7. Proper cleanup before redirect
//         localStorage.clear();
//         sessionStorage.clear();

//         // 8. More robust path checking
//         const authPaths = ["/auth", "/login", "/signin"];
//         const currentPath = window.location.pathname;

//         if (!authPaths.some((path) => currentPath.startsWith(path))) {
//           // 9. Add returnTo parameter for better UX
//           const returnTo = encodeURIComponent(
//             window.location.pathname + window.location.search
//           );
//           window.location.replace(`/auth?view=login&returnTo=${returnTo}`);
//         }

//         throw new Error("SESSION_EXPIRED");
//       }
//     }

//     // 10. Improved error handling
//     const serverError = axiosError.response?.data || {
//       message: axiosError.message || "Network error",
//       code: axiosError.code,
//     };

//     throw serverError;
//   }
// };

const appFetch = async (
  route: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: Record<string, unknown> | FormData,
  headers?: Record<string, string>
) => {
  try {
    const serverResponse = await axios({
      method,
      url: MainDomain + route,
      data: method !== "GET" ? body : undefined,
      headers,
      withCredentials: true,
    });

    return serverResponse.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError?.response?.status === 403) {
      // Try refreshing token
      try {
        await axios.post(
          `${MainDomain}/user/refresh-token`,
          {},
          { withCredentials: true }
        );
        // Retry the original request
        const retryRes = await axios({
          method,
          url: MainDomain + route,
          data: method !== "GET" ? body : undefined,
          headers,
          withCredentials: true,
        });
        return retryRes.data;
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);

        const currentPath = window.location.pathname;

        // Only redirect if not already on login page
        if (currentPath !== "/auth") {
          // window.location.href = "/auth?view=login";

          window.location.replace("/auth?view=login");
        }
        throw new Error("Session expired");
      }
    }
    // console.error("Error in appFetch:", error);

    const serverError =
      error instanceof AxiosError
        ? error.response?.data
        : "An unexpected error occurred";

    throw new Error(JSON.stringify(serverError));
  }
};
// catch (error: unknown) {
//   console.error("Error in appFetch:", error);

//   const serverError =
//     error instanceof AxiosError
//       ? error.response?.data
//       : "An unexpected error occurred";

//   throw new Error(JSON.stringify(serverError));
// }
export {
  loginUserFromServer,
  getAuthenticatedUserFromServer,
  getAllUserMealFromDB,
  getRestaurantMenu,
  getProductDetails,
  findSelectedTheme,
  findUserRestaurants,
  getAllStoreTemplates,
  getAllSubscriptionPlans,
  createNewMeal,
  createNewRestaurant,
  getAllUserOwnedTemplates,
  purchaseTemplateAPI,
  getTemplateUiConfigAPI,
  createNewRestaurantAndTemplate,
  updateTemplateAPI,
  getCurrentUserNameAPI,
  getCurrentUserSubscriptionPlanAPI,
  createNewManagerAccountAPI,
  getOwnerManagersAPI,
  logoutUserAPI,
  toggleRestaurantActivationAPI,
  updateMealAPI,
  deleteMealAPI,
  checkServerHealthAPI,
  getAllUserRestaurantMealsAPI,
  getSelectedLanguageAPI,
  createNewUserAPI,
  updateUserNameAPI,
  updateRestaurantDetailsAPI,
  getSelectedLanguagePricingPlanAPI,
  checkIfUserAlreadyLoggedInAPI,
  addMealsLanguagesTranslationAPI,
  addOrUpdateRestaurantLanguagesTranslationAPI,
  deleteRestaurantLanguageAPI,
  getDemoMealsAPI,
  deleteManagerAPI,
  updateManagerDetailsAPI,
  deleteUserRestaurantAPI,
  checkIfUrlExistsAPI,
  loginManagerAccountAPI,
  updateSelectedLanguageAPI,
  updateUserInfoAPI,
  updateUserPasswordAPI,
  deleteUserAccountAPI,
  sendEmailSupportAPI,
  createSubscriberAPI,
  toggleManagerMealAvailabilityAPI,
  updateRestaurantLogoAPI,
  updateSubscriptionPlanAPI,
  saveCheckoutIdAPI,
  applyTemplate,
  changeRestaurantCurrencyAPI,
};
