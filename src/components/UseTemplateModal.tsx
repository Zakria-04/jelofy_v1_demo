"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { getAllUserRestaurantsAPI } from "@/store/restaurant/restaurantThunk";
import Link from "next/link";

type UseTemplateModalProps = {
  newTemplateName: string;
  onClose: () => void;
  onApply: (restaurantId: string, newTemplateName: string) => void;
};

const UseTemplateModal: React.FC<UseTemplateModalProps> = ({
  newTemplateName,
  onClose,
  onApply,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants } = useAppSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getAllUserRestaurantsAPI());
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Apply <span className="text-custom-red-4">{newTemplateName}</span> to
          a restaurant
        </h2>

        {restaurants?.length === 0 ? (
          <div className="text-center">
            <p className="mb-4">You don’t have any restaurants yet.</p>
            <Link
              href="/dashboard/my-restaurants"
              className="text-white bg-custom-red-4 px-4 py-2 rounded-full inline-block"
            >
              Go To Restaurants
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {restaurants?.map((restaurant) => (
              <div
                key={restaurant._id}
                className="border rounded-xl p-4 shadow-sm flex flex-col justify-between bg-gray-50"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {restaurant.restaurantName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    URL: {restaurant.businessUrl}
                  </p>
                  <p className="text-sm mt-1">
                    Current Template:{" "}
                    <span className="font-medium text-blue-600">
                      {restaurant.selectedTemplate}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => onApply(restaurant._id, newTemplateName)}
                  className="mt-4 w-full bg-custom-red-4 text-white py-2 rounded-full hover:bg-custom-red-1 transition"
                >
                  Use This Template
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black px-4 py-2 underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseTemplateModal;
