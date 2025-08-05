import Image from "next/image";
import React from "react";

interface ContentDishCategoryProps {
  category: string[];
  toggleSelectedCategoryModal?: (category: string) => void;
}

const ContentDishCategory: React.FC<ContentDishCategoryProps> = ({
  category,
  toggleSelectedCategoryModal = () => {},
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 mt-10">
      {category?.map((item, index) => (
        <div
          className="h-36 bg-gray-200 rounded-3xl relative cursor-pointer"
          key={item}
          onClick={() => toggleSelectedCategoryModal(item)}
        >
          <div className="relative w-full h-full">
            <Image
              src={
                index === 0
                  ? "https://res.cloudinary.com/dfwjujk7m/image/upload/v1753375734/55eb70e0-d169-40ba-b038-37e2cb163de2_d4chah.png"
                  : index === 1
                  ? "https://res.cloudinary.com/dfwjujk7m/image/upload/v1753448823/7a2ac599-b1d7-4a6d-a26f-b74014b45d15_zzuays.png"
                  : index === 2
                  ? "https://res.cloudinary.com/dfwjujk7m/image/upload/v1753448836/18e8e407-875f-40de-a5e9-cab32f74fc27_a9lpic.png"
                  : index === 3
                  ? "https://res.cloudinary.com/dfwjujk7m/image/upload/v1753294238/236b778d-e65d-47cb-af74-8e3f71658c70_venbt0.png"
                  : "https://res.cloudinary.com/dfwjujk7m/image/upload/v1753448847/9c84336c-4391-42a9-89cc-147984066688_zaw7jz.png"
              }
              fill
              className="object-cover rounded-3xl"
              alt={item}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-3xl">
              <h2 className="text-2xl text-white font-bold">{item}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentDishCategory;
