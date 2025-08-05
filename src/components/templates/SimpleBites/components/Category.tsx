// import React, { useState } from "react";

// type Meals = {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   image: string;
// };

// type Category = {
//   backgroundColor: { color: string };
//   backgroundColorSelected: { color: string };
//   border: { size: string; color: string };
//   borderSelected: { size: string; color: string };
//   textColor: { color: string };
//   textColorSelected: { color: string };
// };

// interface CategoryProps {
//   meals: Meals[];
//   category: Category;
// }

// const Category = ({ meals, category }: CategoryProps) => {
//   const uniqueCategories = [...new Set(meals.map((meal) => meal.category))];
//   uniqueCategories.unshift("All");

//   const [selectedCategory, setSelectedCategory] = useState(0);

//   const handleSelectedCategory = (index: number) => {
//     setSelectedCategory(index);
//   };

//   return (
//     <div>
//       <div className="flex gap-7 overflow-x-auto whitespace-nowrap hide-scrollbar p-2 xsm:p-3 md:justify-center mt-1">
//         {uniqueCategories.map((categoryList, index) => (
//           <div
//             key={categoryList}
//             className="uppercase p-1.5 xsm:p-2.5 min-w-28 text-center rounded-md cursor-pointer transition-all duration-150 ease-in-out lg:text-4xl lg:p-5 lg:min-w-48 xl:text-xl xl:p-3 xl:min-w-32"
//             style={{
//               color:
//                 index === selectedCategory
//                   ? category?.textColorSelected?.color
//                   : category?.textColor?.color,
//               backgroundColor:
//                 index === selectedCategory
//                   ? category?.backgroundColorSelected?.color
//                   : category?.backgroundColor?.color,
//               border: `${category?.border?.size} solid ${category?.border?.color}`,
//             }}
//             onClick={() => handleSelectedCategory(index)}
//           >
//             {categoryList}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Category;

import React, { useState } from "react";
import { motion } from "framer-motion";

type Meals = {
  _id: string;
  name: string;
  description: string;
  translations: {
    [key: string]: { name: string; description: string; category?: string };
  };
  price: number;
  category: string;
  image: string;
};

type Category = {
  backgroundColor: { color: string };
  backgroundColorSelected: { color: string };
  border: { size: string; color: string };
  borderSelected: { size: string; color: string };
  textColor: { color: string };
  textColorSelected: { color: string };
  enabled: boolean;
};

interface CategoryProps {
  meals: Meals[];
  category: Category;
  setSelectedCategoryList: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
}

const Category = ({
  meals,
  category,
  setSelectedCategoryList,
  selectedLanguage,
}: CategoryProps) => {
  const uniqueCategories = [
    ...new Set(
      meals.map(
        (meal) =>
          meal?.translations[selectedLanguage]?.category || meal?.category
      )
    ),
  ];
  const [selectedCategory, setSelectedCategory] = useState(0);

  if (uniqueCategories.length <= 1 || !category.enabled) return null;

  const handleSelectedCategory = (index: number) => {
    setSelectedCategory(index);
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-7 overflow-x-auto whitespace-nowrap hide-scrollbar p-2 xsm:p-3 md:justify-center mt-2.5">
        {uniqueCategories.map((categoryList, index) => (
          <motion.div
            key={categoryList}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 xsm:p-2.5 min-w-28 xsm:min-w-32 text-center rounded-md cursor-pointer transition-all duration-150 ease-in-out lg:text-4xl lg:p-5 lg:min-w-48 xl:text-xl xl:p-3 xl:min-w-32"
            style={{
              color:
                index === selectedCategory
                  ? category?.textColorSelected?.color
                  : category?.textColor?.color,
              backgroundColor:
                index === selectedCategory
                  ? category?.backgroundColorSelected?.color
                  : category?.backgroundColor?.color,
              border:
                index === selectedCategory
                  ? `${category?.borderSelected?.size} solid ${category?.borderSelected?.color}`
                  : `${category?.border?.size} solid ${category?.border?.color}`,
            }}
            onClick={() => {
              handleSelectedCategory(index);
              setSelectedCategoryList(categoryList);
            }}
          >
            {categoryList}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Category;
