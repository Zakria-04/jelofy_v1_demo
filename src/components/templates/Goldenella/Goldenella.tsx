"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import { useAppSelector } from "@/store/store/storeSelectors";
import MainContent from "./components/MainContent";
import BookmarkMeal from "./components/BookmarkMeal";
import SavedMeals from "./components/SavedMeals";

const Goldenella = () => {
  const { bookmarkedMeals } = useAppSelector((state) => state.store);
  const [modals, setModals] = useState<{
    selectedCategoryModal?: boolean;
    savedMealsModal?: boolean;
  }>({
    selectedCategoryModal: false,
    savedMealsModal: false,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[640px]  min-h-screen">
      <div dir="">
        {/* header */}
        <Header />

        {/* main content */}
        <MainContent
          modals={modals}
          setModals={setModals}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* footer */}
        {/* //TODO add instagram, tiktok and social media links */}

        {/* Bookmark meals */}
        <BookmarkMeal
          bookMarkMealsCount={bookmarkedMeals.length}
          setModals={setModals}
        />

        {/* Saved Meals */}
        {modals?.savedMealsModal && (
          <SavedMeals
            onClose={() => setModals({ ...modals, savedMealsModal: false })}
          />
        )}
      </div>
    </div>
  );
};

export default Goldenella;
