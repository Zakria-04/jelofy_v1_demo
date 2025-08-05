"use client";
import { toggleManagerMealAvailabilityThunk } from "@/store/manager/managerThunk";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const ManagerMealPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { meals } = useAppSelector((state) => state.manager);

  const toggleMealStatus = async (mealId: string) => {
    try {
      const response = await dispatch(
        toggleManagerMealAvailabilityThunk({
          mealID: mealId,
        })
      ).unwrap();

      return response;
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Meal Management</h1>
          <p className="text-gray-600">
            Click status to toggle meal availability
          </p>
        </header>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">
              Current Menu Items
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {meals?.map((meal) => (
              <div
                key={meal?._id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                    {meal?.imageUrl && (
                      <Image
                        src={meal.imageUrl}
                        width={74}
                        height={74}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                        priority
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{meal?.name}</h3>
                    <p className="text-sm text-gray-500">{meal?.description}</p>
                    <span className="text-sm font-medium text-gray-700">
                      {meal?.price}
                    </span>
                  </div>
                </div>

                <button
                  // onClick={() => toggleMealStatus(meal._id)}
                  onClick={() => toggleMealStatus(meal?._id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    meal?.isAvailable
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                >
                  {meal.isAvailable ? "Active" : "Inactive"}
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-500">
              {meals?.filter((m) => m.isAvailable).length} active items •{" "}
              {meals?.filter((m) => !m.isAvailable).length} inactive items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerMealPage;
