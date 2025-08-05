import React from "react";
// import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {/* <FiSearch className="text-gray-400" /> */}
        x
      </div>
      <input
        type="text"
        placeholder="Search meals by name or description..."
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default SearchInput;

// import React from "react";

// interface SearchInputProps {
//   searchMeal: string;
//   setSearchMeal: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const SearchInput = ({ searchMeal, setSearchMeal }: SearchInputProps) => {
//   return (
//     <search className="p-4 text-center">
//       <input
//         type="text"
//         placeholder="Search meals..."
//         value={searchMeal}
//         onChange={setSearchMeal}
//         className="border border-custom-grey-3 w-full p-3 rounded-md bg-transparent text-custom-black2 outline-none"
//       />
//     </search>
//   );
// };

// export default SearchInput;
