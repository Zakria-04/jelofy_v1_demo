import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getAllRestaurantMealsThunk } from "@/store/meal/mealThunks";
import { AppDispatch } from "@/store/store";
import { getAllUserRestaurantsAPI } from "@/store/restaurant/restaurantThunk";
import { useAppSelector } from "@/store/store/storeSelectors";

import {
  getCurrentUserSubscriptionPlanAPI,
  MainDomain,
  toggleRestaurantActivationAPI,
} from "@/res/api";
import { useTranslations } from "next-intl";
// import { useAppSelector } from "@/store/store/storeSelectors";

// Define types for your data structures
type Restaurant = {
  _id: string;
  restaurantName: string;
  businessUrl: string;
  selectedTemplateId?: string;
  selectedTemplate?: string;
  name?: string;
  isActive: boolean;
};

type Meal = {
  isAvailable: boolean;
  // Add other meal properties as needed
};

type DashboardCardProps = {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
};

const DashboardCard = ({ title, value, children }: DashboardCardProps) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between gap-2 min-w-[160px]">
    <h4 className="text-gray-500 text-sm font-semibold">{title}</h4>
    {value && <p className="text-2xl font-bold text-custom-black2">{value}</p>}
    {children}
  </div>
);

type MyMenuProps = {
  isSideBarOpen?: boolean;
};

const MyMenu = ({}: MyMenuProps) => {
  const Greeting = useTranslations("Greeting");
  const DashBoard = useTranslations("DashBoard");
  // const meals = useSelector(selectMeals);
  // const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const [activeMeals, setActiveMeals] = useState<number>(0);
  const [userRestaurants, setUserRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  // const [showLiveView, setShowLiveView] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [currentPlan, setCurrentPlan] = useState<string>("");

  // const { error } = useAppSelector((state) => state.meal);

  useEffect(() => {
    const eventSource = new EventSource(
      `${MainDomain}/sse/owner/${selectedRestaurant?._id}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setViewerCount(data.count);
    };

    eventSource.onerror = (err) => {
      console.error("SSE error", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [selectedRestaurant]);

  useEffect(() => {
    // const fetchAllMeals = async () => {
    //   try {
    //     const response = await dispatch(getAllMealsAPI()).unwrap();
    //     const filterActiveMeals = response?.meals?.filter(
    //       (meal: Meal) => meal.isAvailable
    //     );
    //     setActiveMeals(filterActiveMeals?.length || 0);
    //   } catch (error: unknown) {
    //     console.error("Failed to fetch meals:", error);
    //   }
    // };

    // const fetchAllRestaurantMeals = async (restaurantId: string) => {


    //   try {
    //     const meals = await dispatch(
    //       getAllRestaurantMealsThunk(restaurantId)
    //     ).unwrap();


    //     return meals;
    //   } catch (error: unknown) {
    //     console.error("Failed to fetch restaurant meals:", error);
    //   }
    // };

    const fetchAllRestaurants = async () => {
      try {
        const response = await dispatch(getAllUserRestaurantsAPI()).unwrap();
        setUserRestaurants(response.restaurants);
        if (response.restaurants?.length > 0) {
          setSelectedRestaurant(response.restaurants[0]);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    // fetchAllMeals();
    fetchAllRestaurants();
    // fetchAllRestaurantMeals(selectedRestaurant?._id || "");
  }, [dispatch]);

  useEffect(() => {
    if (selectedRestaurant) {
      const fetchAllRestaurantMeals = async (restaurantId: string) => {
        try {
          const meals = await dispatch(
            getAllRestaurantMealsThunk(restaurantId)
          ).unwrap();
          const filterActiveMeals = meals?.meals?.filter(
            (meal: Meal) => meal.isAvailable
          );
          setActiveMeals(filterActiveMeals?.length || 0);
        } catch (error: unknown) {
          console.error("Failed to fetch restaurant meals:", error);
        }
      };

      fetchAllRestaurantMeals(selectedRestaurant._id);
    }
  }, [dispatch, selectedRestaurant]);

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const restaurantId = e.target.value;
    const restaurant = userRestaurants.find((r) => r._id === restaurantId);
    if (restaurant) {
      setSelectedRestaurant(restaurant);
    }
  };

  useEffect(() => {
    const getCurrentUserSubscriptionPlan = async () => {
      try {
        const response = await getCurrentUserSubscriptionPlanAPI();

        if (response.success) {
          setCurrentPlan(response.plan);
        }
      } catch {}
    };
    getCurrentUserSubscriptionPlan();
  }, []);

  const handleRestaurantActivationBtn = async () => {
    try {
      if (!selectedRestaurant) return;
      const response = await toggleRestaurantActivationAPI(
        selectedRestaurant._id
      );
      if (response.success) {
        setSelectedRestaurant((prev) => {
          if (prev) {
            return { ...prev, isActive: response.isActive };
          }
          return prev;
        });
      }
    } catch (error: unknown) {
      console.error("Failed to toggle restaurant activation:", error);
    }
  };

  // const handleLiveViewClick = () => {
  //   setShowLiveView(true);
  // };

  // Check if the user has any restaurants to display the dashboard
  // if (error?.type === "empty restaurant") {
  //   return (
  //     <div>
  //       <h1>You don&apos;t have any restaurants</h1>
  //     </div>
  //   );
  // }

  if (!selectedRestaurant) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-custom-black2">
          No Restaurants Found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h3 className="hidden xl:block text-2xl text-custom-black2 mb-2">
        <p>{Greeting("greeting_1", { username: user?.user?.userName })}</p>
      </h3>
      <p className="text-lg mb-4">{Greeting("greetingText")}</p>

      <div className="mb-6">
        <label
          htmlFor="restaurant-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {DashBoard("selectedRestaurant")}
        </label>
        <select
          id="restaurant-select"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-red-1 outline-none"
          value={selectedRestaurant?._id || ""}
          onChange={handleRestaurantChange}
        >
          {userRestaurants.map((restaurant) => (
            <option className="" key={restaurant._id} value={restaurant._id}>
              {restaurant.restaurantName} - /{restaurant.businessUrl}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
        <DashboardCard title={DashBoard("activeMeals")} value={activeMeals} />
        <DashboardCard title={DashBoard("restaurantViews")}>
          {currentPlan !== "starter" ? (
            <div className="flex flex-col">
              <p className="text-2xl font-bold text-custom-black2">
                {viewerCount}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {DashBoard("realTimeViewers")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <div className="p-2 bg-gray-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {DashBoard("premiumFeature")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {DashBoard("viewCountsLocked")}
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard/plans"
                className="w-full text-center bg-custom-red-4 hover:bg-custom-red-3 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                {DashBoard("upgradeNow")}
              </Link>
            </div>
          )}
        </DashboardCard>
        <DashboardCard title={DashBoard("status")}>
          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-sm ${
                selectedRestaurant?.isActive ? "text-green-600" : "text-red-500"
              } font-medium`}
            >
              {selectedRestaurant?.isActive ? "Active" : "Inactive "}
            </span>
            <button
              onClick={handleRestaurantActivationBtn}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full text-sm"
            >
              {DashBoard("toggleStatus")}
            </button>
          </div>
        </DashboardCard>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <DashboardCard title="Live View">
          <button
            onClick={handleLiveViewClick}
            className="bg-custom-red-4 text-white px-4 py-2 rounded-lg hover:bg-custom-red-2 transition"
          >
            Preview Your Menu
          </button>
        </DashboardCard> */}

        <DashboardCard title={DashBoard("mealManager")}>
          <Link
            href={{
              pathname: "/meal-manager",
              query: { restaurantId: selectedRestaurant?._id },
            }}
            className="block bg-custom-red-4 text-white text-center px-4 py-2 rounded-lg hover:bg-custom-red-3"
          >
            {DashBoard("mealManagerBtn")}
          </Link>
        </DashboardCard>

        <DashboardCard title={DashBoard("editMenuAppearance")}>
          <Link
            href={{
              pathname: "/editor",
              query: {
                restaurantId: selectedRestaurant?.selectedTemplateId,
                selectedTemplate: selectedRestaurant?.selectedTemplate,
                businessUrl: selectedRestaurant?.businessUrl,
              },
            }}
            className="block bg-custom-red-4 text-white text-center px-4 py-2 rounded-lg hover:bg-custom-red-3"
          >
            {DashBoard("editMenuAppearanceBtn")}
          </Link>
        </DashboardCard>
      </div>

      {/* {showLiveView && selectedRestaurant && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">
            Live Preview: {selectedRestaurant.restaurantName}
          </h3>
          <div className="flex justify-center">
            <div
              className="relative border-8 border-custom-black1 rounded-3xl overflow-hidden"
              style={{
                width: "375px",
                height: "667px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <iframe
                src={`http://localhost:3000/store/${selectedRestaurant.businessUrl}`}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title="Live Menu Preview"
              />
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MyMenu;
