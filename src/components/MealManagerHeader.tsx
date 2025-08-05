import BackIcon from "@/utils/icons/BackIcon";
import React from "react";

interface MealManagerHeaderProps {
  onAddMeal: () => void;
}

const MealManagerHeader = ({ onAddMeal }: MealManagerHeaderProps) => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={goBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <div className="size-9">
            <BackIcon color="#E55656" />
          </div>
        </button>
        {/* <h1 className="text-2xl font-semibold text-gray-800">Meal Manager</h1> */}
      </div>

      <button
        onClick={onAddMeal}
        className="bg-custom-red-4 hover:bg-custom-red-1 px-6 py-3 text-white rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-5"
      >
        Add New Meal
      </button>
    </header>
  );
};

export default MealManagerHeader;