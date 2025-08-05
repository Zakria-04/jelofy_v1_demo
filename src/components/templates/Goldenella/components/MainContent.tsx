import SearchIcon from "@/utils/icons/SearchIcon";
import React from "react";
import ContentHeader from "./ContentHeader";
import ContentDishCategory from "./ContentDishCategory";
import { useAppSelector } from "@/store/store/storeSelectors";
import SelectedCategoryDishes from "./SelectedCategoryDishes";
// import ContentCategory from "./ContentCategory";

interface MainContentProps {
  modals: {
    selectedCategoryModal?: boolean;
  };
  setModals: React.Dispatch<
    React.SetStateAction<{
      selectedCategoryModal?: boolean;
    }>
  >;
  setSelectedCategory: (category: string) => void;
  selectedCategory: string | null;
}

const MainContent = ({
  modals,
  setModals,
  setSelectedCategory,
  selectedCategory,
}: MainContentProps) => {
  const { category, meals } = useAppSelector((state) => state.store);

  const toggleSelectedCategoryModal = (category: string) => {
    setSelectedCategory(category);
    setModals((prev) => ({
      ...prev,
      selectedCategoryModal: !prev?.selectedCategoryModal,
    }));
  };

  const filterMealsBasedOnCategory = meals.filter(
    (meal) => meal.category === selectedCategory
  );

  return (
    <div className="bg-white rounded-tl-2xl rounded-tr-2xl -mt-[5vh] min-h-[80vh] p-3">
      {/* Content Header */}
      <ContentHeader />

      {/* Category */}
      {/* //TODO add this option later */}
      {/* <ContentCategory /> */}

      {/* search input */}
      <div className="flex items-center gap-2 mt-4 border border-none bg-gray-100 rounded-full py-1.5 px-2 shadow">
        <input
          type="search"
          placeholder="search..."
          className="w-full outline-none bg-transparent"
        />
        <div className="flex items-center justify-center w-8 h-8 bg-white shadow rounded-full">
          <SearchIcon />
        </div>
      </div>

      {/* food service category */}
      <ContentDishCategory
        category={category}
        toggleSelectedCategoryModal={toggleSelectedCategoryModal}
      />

      {/* Selected Category Dishes */}
      {modals?.selectedCategoryModal && (
        <SelectedCategoryDishes
          meals={filterMealsBasedOnCategory}
          selectedCategory={selectedCategory}
          onClose={() => setModals({ ...modals, selectedCategoryModal: false })}
        />
      )}
    </div>
  );
};

export default MainContent;
