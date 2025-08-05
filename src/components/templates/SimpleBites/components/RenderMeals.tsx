export type Meals = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  unit: string;
  imageUrl: string;
  translations: {
    [key: string]: { name: string; description: string; unit: string };
  };
  size: {
    size: string;
    price: number;
    quantity: number;
  }[];
};

interface RenderMealsProps {
  selectedLanguage: string;
  meals: Meals[];
  mealContainer: {
    mealDescription: { color: string };
    mealPrice: { color: string };
    mealName: { color: string };
    mealSize: { color: string; border: string };
    mealBorder: { size: string; color: string };
    backgroundColor: { color: string };
  };
  currency?: string;
}

import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const RenderMeals = ({
  mealContainer,
  meals,
  selectedLanguage,
  currency
}: RenderMealsProps) => {
  if (meals?.length <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center mt-10"
      >
        <h3
          className="text-lg"
          style={{ color: mealContainer?.mealDescription?.color }}
        >
          No meals available in this category
        </h3>
      </motion.div>
    );
  }

  return (
    <div className="p-2 grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence>
        {meals?.map((meal) => (
          <motion.div
            key={meal?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="p-4 rounded-lg"
            style={{
              backgroundColor: mealContainer.backgroundColor.color,
              border: `${mealContainer?.mealBorder?.size} solid ${mealContainer?.mealBorder?.color}`,
            }}
          >
            {/* top Box */}
            <div className="flex gap-5">
              {meal.imageUrl && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={meal.imageUrl}
                    width={100}
                    height={100}
                    alt={`${meal.name}-img`}
                    className="rounded-lg size-20 xsm:size-24 object-cover"
                    priority
                  />
                </motion.div>
              )}
              <div
                className={`mt-3 ${
                  !meal.imageUrl && "flex justify-between items-center w-full"
                }`}
              >
                <h3
                  className="xsm:text-lg"
                  style={{ color: mealContainer?.mealName?.color }}
                >
                  {meal?.translations[selectedLanguage]?.name || meal?.name}
                </h3>
                {meal?.size?.length <= 0 && (
                  <span
                    className={`${!meal?.imageUrl && "text-lg"}`}
                    style={{ color: mealContainer?.mealPrice?.color }}
                  >
                    {meal.price} {currency || ""}
                  </span>
                )}
              </div>
            </div>
            {/* bottom Box */}
            <div className="mt-3 text-sm">
              <p style={{ color: mealContainer?.mealDescription?.color }}>
                {meal?.translations[selectedLanguage]?.description ||
                  meal?.description}
              </p>

              {meal?.size?.map((size, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between mt-5"
                >
                  <p
                    className="p-2 px-4 rounded-3xl text-sm xsm:text-lg"
                    style={{
                      color: mealContainer?.mealSize?.color,
                      border: `${mealContainer?.mealSize?.border} solid ${mealContainer?.mealSize?.color}`,
                    }}
                  >
                    {size?.size}{" "}
                    {meal?.translations[selectedLanguage]?.unit || meal?.unit}
                  </p>
                  <p
                    className="text-sm xsm:text-lg"
                    style={{
                      color: mealContainer?.mealPrice?.color,
                    }}
                  >
                    {size?.price} {currency || ""}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RenderMeals;

// import Image from "next/image";
// import React from "react";

// export type Meals = {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   imageUrl: string;
//   translations: {
//     [key: string]: { name: string; description: string };
//   };
//   size: {
//     size: string;
//     price: number;
//     quantity: number;
//   }[];
// };

// interface RenderMealsProps {
//   selectedLanguage: string;
//   meals: Meals[];
//   mealContainer: {
//     mealDescription: { color: string };
//     mealPrice: { color: string };
//     mealName: { color: string };
//     mealSize: { color: string; border: string };
//     mealBorder: { size: string; color: string };
//     backgroundColor: { color: string };
//   };
// }

// const RenderMeals = ({
//   mealContainer,
//   meals,
//   selectedLanguage,
// }: RenderMealsProps) => {
//   if (meals.length <= 0) {
//     return (
//       <div className="flex items-center justify-center py-10">
//         <h3
//           className="text-lg text-center"
//           style={{ color: mealContainer?.mealDescription?.color }}
//         >
//           No meals available in this category
//         </h3>
//       </div>
//     );
//   }

//   return (
//     <div className="p-2 grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
//       {meals.map((meal) => (
//         <div
//           key={meal._id}
//           className="p-4 rounded-lg h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]"
//           style={{
//             backgroundColor: mealContainer.backgroundColor.color,
//             border: `${mealContainer?.mealBorder?.size} solid ${mealContainer?.mealBorder?.color}`,
//           }}
//         >
//           {/* Image and Name/Price Row */}
//           <div className="flex gap-4 flex-grow">
//             {meal.imageUrl && (
//               <div className="relative w-24 h-24 flex-shrink-0">
//                 <Image
//                   src={meal.imageUrl}
//                   fill
//                   alt={meal?.translations[selectedLanguage]?.name || meal?.name}
//                   className="rounded-lg object-cover"
//                   priority
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 />
//               </div>
//             )}

//             <div className={`flex flex-col ${!meal.imageUrl ? "w-full" : ""}`}>
//               <div className="flex justify-between items-start">
//                 <h3
//                   className="text-lg font-medium line-clamp-2"
//                   style={{ color: mealContainer?.mealName?.color }}
//                 >
//                   {meal?.translations[selectedLanguage]?.name || meal?.name}
//                 </h3>
//                 {meal.size.length <= 0 && (
//                   <span
//                     className="text-lg whitespace-nowrap ml-2"
//                     style={{ color: mealContainer?.mealPrice?.color }}
//                   >
//                     {meal.price.toFixed(2)}
//                   </span>
//                 )}
//               </div>

//               {/* Description */}
//               <p
//                 className="mt-2 text-sm line-clamp-3 flex-grow"
//                 style={{ color: mealContainer?.mealDescription?.color }}
//               >
//                 {meal?.translations[selectedLanguage]?.description ||
//                   meal?.description}
//               </p>
//             </div>
//           </div>

//           {/* Sizes */}
//           {meal.size.length > 0 && (
//             <div className="mt-4 space-y-3">
//               {meal.size.map((size, index) => (
//                 <div
//                   className="flex items-center justify-between"
//                   key={`${meal._id}-${index}`}
//                 >
//                   <span
//                     className="py-1 px-3 rounded-full text-sm"
//                     style={{
//                       color: mealContainer?.mealSize?.color,
//                       border: `${mealContainer?.mealSize?.border} solid ${mealContainer?.mealSize?.color}`,
//                     }}
//                   >
//                     {size.size}
//                   </span>
//                   <span
//                     className="text-lg"
//                     style={{
//                       color: mealContainer?.mealPrice?.color,
//                     }}
//                   >
//                     {size.price.toFixed(2)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RenderMeals;
