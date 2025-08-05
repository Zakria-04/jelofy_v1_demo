"use client";
import React, { useEffect, useState, useCallback } from "react";
import MealManagerHeader from "./MealManagerHeader";
import SearchInput from "./SearchInput";
import MealsStatus from "./MealsStatus";
import MealsList from "./MealsList";
import { useDispatch } from "react-redux";
import {
  deleteMealThunk,
  getAllRestaurantMealsThunk,
} from "@/store/meal/mealThunks";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import MealModal from "./MealModal";
import DeleteConformationModal from "./DeleteConformationModal";
import { useSearchParams } from "next/navigation";
import ErrorModal from "./ErrorModal";

interface Meal {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  image?: string;
  previewImage?: string;
}

type MealFormData = {
  _id?: string;
  name: string;
  description: string;
  price: string;
  image: File | null;
  previewImage: string | ArrayBuffer | null;
};

const MenuManager = () => {
  const searchParams = useSearchParams();
  const { meals } = useAppSelector((state) => state.meal);
  const dispatch = useDispatch<AppDispatch>();
  const [searchMeal, setSearchMeal] = useState("");
  const [activeModal, setActiveModal] = useState<"create" | "update" | null>(
    null
  );
  const [selectedMeal, setSelectedMeal] = useState<Meal | MealFormData | null>(
    null
  );
  const [deleteMealModal, setDeleteMealModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restaurantId = searchParams.get("restaurantId");

  // Memoized filtered meals
  const filteredMeals = useCallback(() => {
    if (!meals) return [];
    return meals.filter(
      (meal) =>
        meal.name?.toLowerCase().includes(searchMeal.toLowerCase()) ||
        (meal.description ?? "")
          .toLowerCase()
          .includes(searchMeal.toLowerCase())
    );
  }, [meals, searchMeal]);

  const filterActiveMeals = useCallback(() => {
    if (!meals) return [];
    return meals.filter((meal) => meal.isAvailable === true);
  }, [meals]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        await dispatch(getAllRestaurantMealsThunk(restaurantId || "")).unwrap();
      } catch {}
    };

    fetchMeals();
  }, [dispatch, restaurantId]);

  const closeDeleteModal = () => {
    setDeleteMealModal(false);
  };

  const handleMealDeleteConfirmation = async () => {
    if (!selectedMeal) return;
    try {
      await dispatch(deleteMealThunk(selectedMeal._id as string)).unwrap();
    } catch {
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <MealManagerHeader onAddMeal={() => setActiveModal("create")} />

      <hr className="my-6 border-gray-200" />

      {/* Search and Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <SearchInput
            value={searchMeal}
            onChange={(e) => setSearchMeal(e.target.value)}
          />
        </div>
        <MealsStatus
          totalMeals={filteredMeals().length}
          activeMeals={filterActiveMeals().length}
        />
      </div>

      {/* Meals List */}
      <MealsList
        meals={filteredMeals()}
        onEdit={(meal) => {
          setSelectedMeal(meal);
          setActiveModal("update");
        }}
        onDelete={(meal) => {
          setSelectedMeal(meal);
          setDeleteMealModal(true);
          // setActiveModal("delete");
        }}
      />

      {/* Modals */}
      {activeModal === "create" && (
        <MealModal
          status="create"
          restaurantId={restaurantId || ""}
          setError={setError}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "update" && selectedMeal && (
        <MealModal
          status="update"
          onClose={() => setActiveModal(null)}
          setError={setError}
          selectedMeal={selectedMeal}
          // onClose={() => setActiveModal(null)}
        />
      )}
      {/* Add delete confirmation modal here if needed */}
      {deleteMealModal && (
        <DeleteConformationModal
          isOpen={true}
          mealName={selectedMeal?.name}
          onClose={closeDeleteModal}
          onConfirm={handleMealDeleteConfirmation}
          actionName="Meal"
        />
      )}

      {error && (
        <ErrorModal
          error={error}
          onClose={() => setError(null)}
          errSolution="you must upgrade your plan to add more meals"
          errorFallback="you have reached the max meal limit"
        />
      )}
    </div>
  );
};

export default MenuManager;
