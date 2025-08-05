import React from "react";

interface MealsStatusProps {
  totalMeals: number;
  activeMeals: number;
}

const MealsStatus = ({ totalMeals, activeMeals }: MealsStatusProps) => {
  const statusCards = [
    {
      label: "Total Meals",
      value: totalMeals,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Active Meals",
      value: activeMeals,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {statusCards.map((card) => (
        <div
          key={card.label}
          className={`${card.bgColor} p-4 rounded-lg shadow-sm border border-gray-100`}
        >
          <p className="text-sm font-medium text-gray-500">{card.label}</p>
          <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MealsStatus;
