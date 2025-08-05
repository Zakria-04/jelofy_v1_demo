import { getAllUserRestaurantsAPI } from "@/store/restaurant/restaurantThunk";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RestaurantCreationModal from "./RestaurantCreationModal";
import { getAllStoreTemplatesAPI } from "@/store/template-store/templateStoreThunks";
import Image from "next/image";
import RestaurantDetailsModal from "./RestaurantDetailsModal";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";
import { resetRestaurantError } from "@/store/restaurant/restaurantSlice";
import { useTranslations } from "next-intl";

type Restaurant = {
  _id: string;
  restaurantName: string;
  businessUrl: string;
  selectedTemplate: string;
  isActive: boolean;
  qrCodeUrl: string;
};

const Restaurant = () => {
  const Restaurants = useTranslations("Restaurants");
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants, loading, error } = useAppSelector(
    (state) => state.restaurant
  );

  const [restaurantCreationModalOpen, setRestaurantCreationModalOpen] =
    useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [restaurantDetailsModalOpen, setRestaurantDetailsModalOpen] =
    useState(false);
  useEffect(() => {
    const fetchAllUserRestaurants = async () => {
      try {
        const response = await dispatch(getAllUserRestaurantsAPI()).unwrap();
        return response;
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    const fetchTemplates = async () => {
      try {
        const response = await dispatch(getAllStoreTemplatesAPI()).unwrap();
        return response;
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchAllUserRestaurants();
    fetchTemplates();
  }, [dispatch]);

  const generateNewRestaurant = async () => {
    setRestaurantCreationModalOpen(true);
  };

  // const deleteUserRestaurant = async (restaurantId: string) => {
  //   try {
  //     const response = await deleteUserRestaurant(restaurantId);
  //     setS
  //   } catch (error) {
  //     console.error("Failed to delete restaurant:", error);
  //   }
  // }

  // const downloadQRCode = (url: string, restaurantName: string) => {
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = `${restaurantName.replace(/\s+/g, "_")}_QRCode.png`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const downloadQRCode = async (url: string, restaurantName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${restaurantName.replace(/\s+/g, "_")}_QRCode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download QR Code:", error);
    }
  };

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          {Restaurants("notFound")}
        </h1>
        <button
          onClick={generateNewRestaurant}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          {Restaurants("createRestaurant1")}
        </button>
        {restaurantCreationModalOpen && (
          <RestaurantCreationModal
            onClose={() => setRestaurantCreationModalOpen(false)}
          />
        )}

        {error && (
          <ErrorModal
            error={error}
            errSolution="This template requires a subscription. Upgrade to access premium designs."
            onClose={() => {
              dispatch(resetRestaurantError());
            }}
            errorFallback="something went wrong"
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-2 min-h-screen">
      <div className="lg:flex justify-between items-center mb-6">
        <h1 className="text-xl xl:text-3xl font-bold text-gray-800 mb-4 lg:mb-0">
          {Restaurants("title")}
        </h1>
        <button
          onClick={generateNewRestaurant}
          className="xl:px-6 xl:py-3 text-sm w-full xl:w-max p-3 xl:text-lg bg-custom-red-4 text-white rounded-lg shadow-md hover:bg-custom-red-1 transition duration-300"
        >
          {Restaurants("createRestaurant2")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {restaurant.restaurantName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {Restaurants("businessUrl")}{" "}
                <span className="font-medium">{restaurant.businessUrl}</span>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {Restaurants("selectedTemplate")}{" "}
                <span className="font-medium">
                  {restaurant.selectedTemplate}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {Restaurants("status")}{" "}
                <span
                  className={`${
                    restaurant.isActive ? "text-green-500" : "text-red-500"
                  } font-medium`}
                >
                  {restaurant.isActive ? "Active" : "Inactive"}
                </span>
              </p>

              {/* QR Code Section */}
              <div className="mb-4 flex flex-col items-center">
                <p className="text-sm text-gray-600 font-medium mb-2">
                  {Restaurants("qrCode")}
                </p>
                <div className="w-32 h-32 mb-4 border border-gray-200 rounded-md p-2 flex items-center justify-center">
                  <Image
                    src={restaurant.qrCodeUrl}
                    width={120}
                    height={120}
                    alt={`${restaurant.restaurantName} QR Code`}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() =>
                    downloadQRCode(
                      restaurant.qrCodeUrl,
                      restaurant.restaurantName
                    )
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {Restaurants("downloadQrCode")}
                </button>

                <a
                  href={`/menu/${restaurant.businessUrl}`}
                  target="_blank"
                  onClick={() => setSelectedRestaurant(restaurant)}
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {Restaurants("viewQrCode")}
                </a>

                <button
                  onClick={() => {
                    // Add your restaurant details navigation logic here
                    setSelectedRestaurant(restaurant);
                    setRestaurantDetailsModalOpen(true);
                  }}
                  className="px-4 py-2 bg-custom-red-4 text-white rounded-md hover:bg-custom-red-1 transition duration-300 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {Restaurants("restaurantDetails")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <LoadingSpinner />}

      {restaurantCreationModalOpen && (
        <RestaurantCreationModal
          onClose={() => setRestaurantCreationModalOpen(false)}
        />
      )}

      {restaurantDetailsModalOpen && (
        <RestaurantDetailsModal
          restaurant={selectedRestaurant}
          onClose={() => setRestaurantDetailsModalOpen(false)}
        />
      )}

      {error && (
        <ErrorModal
          onClose={() => {
            dispatch(resetRestaurantError());
          }}
          error={error}
          errorFallback="something went wrong"
          errSolution="To continue, please upgrade your plan to create more restaurants."
        />
      )}
    </div>
  );
};

export default Restaurant;
