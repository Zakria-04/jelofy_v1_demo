import { motion, AnimatePresence } from "framer-motion"; // Add these imports
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { Meals, setBookmarkedMeals } from "@/store/store/storeSlice";
import BookmarkIcon_2 from "@/utils/icons/BookmarkIcon_2";
import { CloseIcon } from "@/utils/icons/CloseIcon";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

interface SelectedCategoryDishesProps {
  meals: Meals[];
  onClose: () => void;
  selectedCategory: string | null;
}

const SelectedCategoryDishes = ({
  meals,
  onClose,
  selectedCategory,
}: SelectedCategoryDishesProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookmarkedMeals } = useAppSelector((state) => state.store);

  const bookmarkMeal = (meal: Meals) => {
    if (bookmarkedMeals.some((m) => m._id === meal._id)) {
      // If the meal is already bookmarked, do not add it again
      alert("This meal is already bookmarked.");
      return;
    }
    dispatch(setBookmarkedMeals([...bookmarkedMeals, meal]));
    // onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center p-2.5"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-gray-100 rounded-lg shadow-lg w-full max-w-2xl h-full overflow-y-auto p-4"
        >
          <div className="flex items-center justify-between flex-row-reverse">
            {/* Close button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="size-12 bg-white shadow rounded-full p-1.5 cursor-pointer"
            >
              <CloseIcon color="#333446" />
            </motion.div>

            <h2 className="text-2xl font-semibold">{selectedCategory}</h2>
          </div>

          {/* Selected Category Dishes Content */}
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {meals.map((meal, index) => (
                <motion.div
                  key={meal?._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-lg shadow ${
                    meal.imageUrl ? "rounded-t-3xl" : ""
                  } relative`}
                >
                  {meal?.imageUrl && (
                    <Image
                      src={meal.imageUrl}
                      alt={meal.name || "Dish image"}
                      className="object-cover w-full aspect-[4/3] rounded-t-3xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      width={800}
                      height={600}
                      quality={85}
                      priority={index < 3}
                    />
                  )}
                  <div className="p-4">
                    <div
                      className={`${
                        meal.imageUrl
                          ? "flex justify-between items-start"
                          : "flex flex-col items-start gap-2"
                      }`}
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                          {meal?.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {meal?.description}
                        </p>
                      </div>
                      <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-sm font-medium whitespace-nowrap">
                        ${meal?.price}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => bookmarkMeal(meal)}
                    className={`absolute top-5 right-4 rounded-full ${
                      meal.imageUrl ? " p-3 size-12" : "p-2 size-10"
                    } ${
                      bookmarkedMeals.some((m) => m._id === meal._id)
                        ? "bg-amber-500"
                        : "bg-amber-500"
                    }`}
                  >
                    <BookmarkIcon_2 selectedColor={bookmarkedMeals.some((m) => m._id === meal._id) ? "#FFDE63" : "#fff"} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SelectedCategoryDishes;

// import { Meals } from "@/store/store/storeSlice";
// import BookmarkIcon_2 from "@/utils/icons/BookmarkIcon_2";
// import { CloseIcon } from "@/utils/icons/CloseIcon";
// import Image from "next/image";
// import React from "react";

// interface SelectedCategoryDishesProps {
//   meals: Meals[];
//   onClose: () => void;
// }

// const SelectedCategoryDishes = ({
//   meals,
//   onClose,
// }: SelectedCategoryDishesProps) => {
//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-6">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[98vh] overflow-y-auto">
//         {/* Header with close button */}
//         <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center z-10">
//           <h2 className="text-2xl font-bold text-gray-900">Category Dishes</h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 size-14"
//             aria-label="Close"
//           >
//             <CloseIcon color="#6b7280"/>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-4 md:p-6">
//           {meals.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No dishes found in this category</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//               {meals.map((meal, index) => (
//                 <div
//                   key={meal?._id}
//                   className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
//                 >
//                   {/* Image container */}
//                   <div className="relative aspect-square overflow-hidden">
//                     {meal?.imageUrl && (
//                       <Image
//                         src={meal.imageUrl}
//                         alt={meal.name || "Dish image"}
//                         fill
//                         className="object-cover transition-transform duration-300 group-hover:scale-105"
//                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                         priority={index < 3}
//                       />
//                     )}
//                     {/* Bookmark button */}
//                     <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition-colors duration-200">
//                       <BookmarkIcon_2 className="w-5 h-5 text-amber-500" />
//                     </button>
//                   </div>

//                   {/* Text content */}
// <div className="p-4">
//   <div className="flex justify-between items-start">
//     <div>
//       <h3 className="font-semibold text-gray-900 line-clamp-1">
//         {meal?.name}
//       </h3>
//       <p className="text-sm text-gray-500 mt-1 line-clamp-2">
//         {meal?.description}
//       </p>
//     </div>
//     <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-sm font-medium whitespace-nowrap">
//       ${meal?.price?.toFixed(2)}
//     </span>
//   </div>
// </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectedCategoryDishes;
