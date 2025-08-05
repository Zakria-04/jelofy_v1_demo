// import PhoneIcon from "@/utils/icons/PhoneIcon";
// import Image from "next/image";
// import React, { useState } from "react";

// interface HeaderTemplateProps {
//   backgroundColor: { color: string };
//   logoText: { name: string; color: string };
//   contactInformation: {
//     color: string;
//     iconColor: string;
//     name: string;
//     phone: string;
//   };
//   logoUrl: { url: string };
// }

// interface HeaderProps {
//   header: HeaderTemplateProps;
// }

// const Header = ({ header }: HeaderProps) => {
//   const [imageError, setImageError] = useState(false);
//   const fallbackImage =
//     "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1746099580/404_pb4uo3.png";
//   return (
//     <header className="flex items-center justify-between p-3 xsm:p-4 lg:p-8">
//       {/* Contact Information */}
//       <div>
//         <div className="size-9 md:size-12 lg:size-20 xl:size-12">
//           <PhoneIcon
//             color={header?.contactInformation?.iconColor}
//             size="100%"
//           />
//         </div>
//         <span
//           className="ml-1 text-sm md:text-lg lg:text-2xl xl:text-sm"
//           style={{ color: header?.contactInformation?.color }}
//         >
//           {header?.contactInformation?.name || ""}
//         </span>
//       </div>

//       {/* Logo */}
//       <div className="flex items-center flex-col">
//         <Image
//           src={
//             imageError ? fallbackImage : header?.logoUrl?.url || fallbackImage
//           }
//           alt="Company logo"
//           width={40}
//           height={40}
//           sizes="(max-width: 768px) 45px, (max-width: 1024px) 56px, 64px"
//           className="object-contain"
//           onError={() => setImageError(true)}
//           priority={false}
//         />
//         <h3
//           style={{ color: header?.logoText?.color }}
//           className="md:text-lg lg:text-3xl xl:text-lg"
//         >
//           {header?.logoText?.name}
//         </h3>
//       </div>
//       <div className="flex-none" style={{ width: "30px" }}></div>
//     </header>
//   );
// };

// export default Header;

import Image from "next/image";
import React from "react";

interface HeaderTemplateProps {
  setLanguageModal: (value: boolean) => void;
  selectedLanguage: {
    iconUrl: string;
  };
  restaurantLanguages: { lang: string; dir: string; iconUrl: string }[];
  headerTemplate: {
    backgroundColor: { color: string };
    logoText: { name: string; color: string };
    logoUrl: { url: string };
  };
}

const Header = ({
  setLanguageModal,
  selectedLanguage,
  restaurantLanguages,
  headerTemplate,
}: HeaderTemplateProps) => {
  // TODO add the fallback image from the commented code

  return (
    <header className="">
      <div className="">
        <Image
          src={headerTemplate?.logoUrl?.url}
          alt="Burger Palace logo"
          width={52}
          height={52}
          className="m-auto object-contain mt-3 size-10 xsm:size-12"
          priority
        />
        <h1
          className="text-center mt-1 text-sm xsm:text-[1rem]"
          style={{ color: headerTemplate?.logoText?.color }}
        >
          {headerTemplate?.logoText?.name}
        </h1>
      </div>
      {restaurantLanguages.length > 1 && (
        <Image
          src={selectedLanguage?.iconUrl}
          onClick={() => setLanguageModal(true)}
          alt="Burger Palace logo"
          className={`absolute top-4 right-4 cursor-pointer size-8 xsm:size-9`}
          width={38}
          height={38}
          priority
        />
      )}
    </header>
  );
};

export default Header;
