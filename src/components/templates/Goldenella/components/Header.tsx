import { useAppSelector } from "@/store/store/storeSelectors";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { restaurantLanguages } = useAppSelector((state) => state.store);

  return (
    <header>
      <div className="bg-gray-100 h-[25vh] relative z-[-1]">
        <div className="bg-gray-100 h-[25vh] flex justify-between items-start">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://res.cloudinary.com/dfwjujk7m/image/upload/v1753293394/76ecce12-afa9-4cb2-b993-442a8603288e_g7jwwf.png"
              fill
              alt="Logo"
            />
          </div>
        </div>
      </div>
      <select className="bg-white p-2 rounded-lg shadow absolute right-4 top-4">
        {restaurantLanguages?.map((language, index) => (
          <option key={index} value={language?.lang}>
            {language?.lang}
          </option>
        ))}
      </select>
    </header>
  );
};

export default Header;

// import { useAppSelector } from "@/store/store/storeSelectors";
// import Image from "next/image";
// import React from "react";

// const Header = () => {
//   const { restaurantLanguages } = useAppSelector((state) => state.store);

//   return (
//     <header className="relative h-[20vh] w-full bg-gray-100 overflow-hidden">
//       {/* Background image */}
//       <div className="absolute inset-0 w-full h-full">
//         <Image
//           src="https://res.cloudinary.com/dfwjujk7m/image/upload/v1753293394/76ecce12-afa9-4cb2-b993-442a8603288e_g7jwwf.png"
//           alt="Background"
//           layout="fill"
//           objectFit="cover"
//           quality={100}
//           className="opacity-20" // Optional: adjust opacity if needed
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 h-full flex justify-between items-center px-4 md:px-8">
//         {/* Logo */}
//         <div className="w-24 h-24 md:w-32 md:h-32 relative">
//           {/* <Image
//             src="https://res.cloudinary.com/dfwjujk7m/image/upload/v1753293394/76ecce12-afa9-4cb2-b993-442a8603288e_g7jwwf.png" // Replace with your actual logo URL
//             alt="Logo"
//             layout="fill"
//             objectFit="contain"
//           /> */}
//         </div>

//         {/* Language selector */}
//         <select className="bg-white p-2 rounded-lg shadow">
//           {restaurantLanguages?.map((language, index) => (
//             <option key={index} value={language?.lang}>
//               {language?.lang}
//             </option>
//           ))}
//         </select>
//       </div>
//     </header>
//   );
// };

// export default Header;
