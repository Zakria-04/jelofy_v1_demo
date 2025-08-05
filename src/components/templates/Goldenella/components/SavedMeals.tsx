import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/store/store/storeSelectors";
import { deleteBookmarkedMeal } from "@/store/store/storeSlice";
import BinIcon from "@/utils/icons/BinIcon";
import BookmarkIcon_2 from "@/utils/icons/BookmarkIcon_2";
import { CloseIcon } from "@/utils/icons/CloseIcon";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface SavedMealsProps {
  onClose: () => void;
}

const SavedMeals: React.FC<SavedMealsProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { bookmarkedMeals } = useAppSelector((state) => state.store);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const handleRemoveMeal = (mealId: string) => {
    dispatch(deleteBookmarkedMeal(mealId));
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-white z-50 overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          >
            <div>
              <div className="flex items-center gap-4 mb-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="size-10 bg-white shadow rounded-full p-1.5"
                >
                  <CloseIcon color="#333446" />
                </motion.button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Saved Meals
                </h1>
              </div>
              <p className="text-gray-500 mt-2">
                Your favorite meals saved for later
              </p>
            </div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full"
            >
              <div className="size-6">
                <BookmarkIcon_2 selectedColor="#D97706" />
              </div>
              <span className="font-medium text-amber-800">
                {bookmarkedMeals.length}
              </span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {bookmarkedMeals.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 bg-gray-50 rounded-xl"
              >
                <div className="mx-auto max-w-md p-4">
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No saved meals yet
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Bookmark your favorite meals to see them here
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="meals-grid"
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {bookmarkedMeals.map((meal) => (
                  <motion.div
                    key={meal._id}
                    variants={item}
                    layout
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="absolute top-3 right-3 z-10"
                    >
                      <button
                        onClick={() => handleRemoveMeal(meal._id)}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200"
                        aria-label="Remove from saved"
                      >
                        <BinIcon />
                      </button>
                    </motion.div>

                    {meal.imageUrl && (
                      <motion.div
                        layout
                        className="relative aspect-video overflow-hidden"
                      >
                        <Image
                          src={meal.imageUrl}
                          alt={meal.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </motion.div>
                    )}

                    <div className="p-4">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-1">
                            {meal.name}
                          </h3>
                          <div className="flex items-center gap-3">
                            <p className="text-xs text-amber-600 font-medium mt-1">
                              {meal.category}
                            </p>
                            <span
                              className={`${
                                meal.imageUrl ? "hidden" : "block"
                              } bg-amber-100 text-amber-800 px-1.5 py-1 rounded-md text-xs font-medium whitespace-nowrap`}
                            >
                              ${meal?.price?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`${
                            meal.imageUrl ? "block" : "hidden"
                          } bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-sm font-medium whitespace-nowrap`}
                        >
                          ${meal?.price?.toFixed(2) || "0.00"}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {meal.description}
                      </p>

                      <div className="mt-4 flex justify-between items-center">
                        <motion.button
                          onClick={() => setSelectedMeal(meal.imageUrl)}
                          whileHover={{ scale: 1.05 }}
                          className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {selectedMeal && (
          <div
            onClick={() => setSelectedMeal(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-zoom-out"
          >
            <div className="relative w-full max-w-2xl mx-auto aspect-video">
              <Image
                src={selectedMeal}
                alt={"Selected Meal Image"}
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SavedMeals;
