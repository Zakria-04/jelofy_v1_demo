import Image from "next/image";
import React from "react";

interface Meal {
  _id: string;
  name: string;
  description: string;
  category: string;
  size?: { size: string; price: number }[];
  price: number;
  imageUrl: string;
  isAvailable: boolean;
}

interface MealsListProps {
  meals: Meal[];
  onEdit: (mealId: Meal) => void;
  onDelete: (mealId: Meal) => void;
}

const MealsList = ({ meals, onEdit, onDelete }: MealsListProps) => {
  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        {/* <Image
          src="/images/empty-state.svg"
          alt="No meals found"
          width={200}
          height={200}
          className="mb-4"
        /> */}
        <h3 className="text-lg font-medium text-gray-700">No meals found</h3>
        <p className="text-gray-500">
          Try adding a new meal or adjusting your search
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {meals.map((meal) => {
        // Determine the price display based on whether sizes exist
        let priceDisplay;
        if (meal?.size && meal?.size?.length > 0) {
          // Extract all prices from sizes
          const prices = meal?.size?.map((size) => size.price);
          // Find min and max prices
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);

          // Format the price range
          priceDisplay =
            minPrice === maxPrice
              ? `${minPrice.toFixed(2)}`
              : `${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`;
        } else {
          // Fallback to the meal's price if no sizes exist
          priceDisplay = meal.price ? `${meal.price.toFixed(2)}` : "$0.00";
        }

        return (
          <div
            key={meal._id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 w-full sm:w-auto">
              <div className="relative w-20 h-20 flex-shrink-0">
                {meal.imageUrl && (
                  <div className="relative w-20 h-20">
                    <Image
                      src={meal.imageUrl}
                      alt={meal.name || "Meal image"}
                      fill
                      sizes="85px"
                      className="rounded-lg object-cover"
                      priority
                    />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
                  {meal.name || "Unnamed Meal"}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {meal.category && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {meal.category}
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs font-medium ${
                      meal.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-custom-red-1"
                    } rounded-full`}
                  >
                    {meal.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {meal.description}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {priceDisplay || "0.00"}
                </p>
              </div>
            </div>

            <div className="flex gap-5 mt-4 sm:mt-0 self-end sm:self-auto">
              <button
                onClick={() => {
                  onEdit(meal);
                }}
                className="p-1 text-gray-700 border border-gray-300 rounded-md min-w-20"
                aria-label="Edit meal"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(meal)}
                className="p-1 text-custom-white-1 bg-custom-red-4 rounded-md min-w-20"
                aria-label="Delete meal"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MealsList;
