import React, { useState, useEffect } from "react";
import {
  getAllUserRestaurantsAPI,
  updateRestaurantCurrencyThunk,
} from "@/store/restaurant/restaurantThunk";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import currencySymbolMap from "currency-symbol-map";
import currencyCodes from "currency-codes";
import CurrencyIcon from "@/utils/icons/CurrencyIcon";
import { useTranslations } from "next-intl";

// Get all currency codes with symbols
const allCurrencies = currencyCodes.codes().map((code) => ({
  code,
  symbol: currencySymbolMap(code) || code,
  name: currencyCodes.code(code)?.currency || code,
}));

const Currency = () => {
  const RestaurantCurrency = useTranslations("RestaurantCurrency");
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants } = useAppSelector((store) => store.restaurant);
  const [activeRestaurant, setActiveRestaurant] = useState<string | null>(null);
  const [customCurrency, setCustomCurrency] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        setIsLoading(true);
        const response = await dispatch(getAllUserRestaurantsAPI()).unwrap();
        if (response.restaurants?.length > 0) {
          // setActiveRestaurant(response.restaurants[0]._id);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllRestaurants();
  }, [dispatch]);

  const handleCurrencyChange = async (
    restaurantId: string,
    newCurrency: string
  ) => {
    try {
      const response = await dispatch(
        updateRestaurantCurrencyThunk({ restaurantId, currency: newCurrency })
      ).unwrap();
      if (response.success) {
        // Optionally, you can update the local state or refetch restaurants
        setActiveRestaurant(restaurantId);
      }
    } catch (error) {
      console.error("Error updating currency:", error);
    }
  };

  const filteredCurrencies = allCurrencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          {RestaurantCurrency("title")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {RestaurantCurrency("subtitle")}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {restaurants?.map((restaurant) => (
          <motion.div
            key={restaurant._id}
            whileHover={{ scale: 1.02 }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 border ${
              activeRestaurant === restaurant._id
                ? "border-blue-400 dark:border-blue-500"
                : "border-gray-200 dark:border-gray-700"
            }`}
            onClick={() => setActiveRestaurant(restaurant._id)}
          >
            <div className="p-4 md:p-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                    <CurrencyIcon color={"#3b82f6"} size={"1.5rem"} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {restaurant.restaurantName}
                    </h3>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                      {restaurant.location}
                    </p> */}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    restaurant.currency
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {restaurant.currency || "Not set"}
                </div>
              </div>

              <AnimatePresence>
                {activeRestaurant === restaurant._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div className="mb-4 space-y-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder={RestaurantCurrency("search")}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowCustomInput(!showCustomInput);
                            setSearchTerm("");
                          }}
                          className="text-sm flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {showCustomInput ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>
                              {RestaurantCurrency("browseCurrency")}
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                              {RestaurantCurrency("customCurrency")}
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {showCustomInput ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="Enter currency code (e.g. USD, EUR) or symbol (e.g. $, €)"
                          value={customCurrency}
                          onChange={(e) => setCustomCurrency(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          maxLength={10}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (customCurrency) {
                              handleCurrencyChange(
                                restaurant._id,
                                customCurrency
                              );
                              setCustomCurrency("");
                            }
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                          disabled={!customCurrency}
                        >
                          {RestaurantCurrency("applyCurrency")}
                        </button>
                      </div>
                    ) : (
                      <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                        {filteredCurrencies?.length > 0 ? (
                          <div className="grid grid-cols-1 gap-1">
                            {filteredCurrencies.map((currency) => (
                              <button
                                key={currency.code}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCurrencyChange(
                                    restaurant._id,
                                    currency.symbol
                                  );
                                }}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                                  restaurant.currency === currency.symbol
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                                }`}
                              >
                                <div className="flex items-center">
                                  <span className="font-medium mr-3">
                                    {currency.symbol}
                                  </span>
                                  <span className="text-sm">
                                    {currency.code}
                                  </span>
                                </div>
                                <span
                                  className={`text-sm truncate max-w-xs ${
                                    restaurant.currency === currency.symbol
                                      ? "text-blue-100"
                                      : "text-gray-500 dark:text-gray-400"
                                  }`}
                                >
                                  {currency.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p className="mt-2">
                              {RestaurantCurrency("notCurrencyFound")}
                            </p>
                            <p className="text-sm mt-1">
                              {RestaurantCurrency("tryAgain")}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {restaurants?.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            {RestaurantCurrency("noRestaurantFound")}
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {RestaurantCurrency("getStarter")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Currency;
