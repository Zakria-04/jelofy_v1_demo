import React from "react";

const ContentCategory = () => {
  return (
    <div className="flex items-center gap-3 mt-4">
      <button className="py-1.5 px-3 bg-green-400 text-white rounded-full font-bold">
        Main menu
      </button>
      <button className="py-1 px-3 text-green-400 border-2 border-green-400 rounded-full font-bold">
        Drinks
      </button>
    </div>
  );
};

export default ContentCategory;
