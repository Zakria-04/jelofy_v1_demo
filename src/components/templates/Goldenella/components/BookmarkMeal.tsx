import BookmarkIcon_2 from "@/utils/icons/BookmarkIcon_2";
import React from "react";

interface BookmarkMealProps {
  bookMarkMealsCount: number;
  setModals: React.Dispatch<
    React.SetStateAction<{
      savedMealsModal?: boolean;
    }>
  >;
}

const BookmarkMeal = ({ bookMarkMealsCount, setModals }: BookmarkMealProps) => {
  return (
    <button
      onClick={() => {
        setModals((prev) => ({
          ...prev,
          savedMealsModal: !prev?.savedMealsModal,
        }));
      }}
      className="fixed bottom-6 right-6 flex items-center justify-center group"
    >
      {" "}
      {/* Added 'group' here */}
      <div className="relative">
        {/* Notification bubble */}
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse z-10">
          {bookMarkMealsCount}
        </div>

        {/* Bookmark icon */}
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer size-16">
          <BookmarkIcon_2 />
        </div>

        {/* Tooltip - Now visible on hover! */}
        <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-3 py-1 rounded whitespace-nowrap z-20">
          {bookMarkMealsCount} Saved Recipes
        </div>
      </div>
    </button>
  );
};

export default BookmarkMeal;
