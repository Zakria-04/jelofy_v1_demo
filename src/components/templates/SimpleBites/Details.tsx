// import { useAppSelector } from "@/store/store/storeSelectors";
// import BackIcon from "@/utils/icons/BackIcon";
// import BookMarkIcon from "@/utils/icons/BookMarkIcon";
// import MinusIcon from "@/utils/icons/MinusIcon";
// import PlusIcon from "@/utils/icons/PlusIcon";
// import Image from "next/image";
// import React, { useState } from "react";

// const Details = () => {
//   const { selectedMeal, template } = useAppSelector((state) => state.store);
//   const [selectedSize, setSelectedSize] = useState<number>(0);
//   const [quantity, setQuantity] = useState<number>(1);

//   if (!selectedMeal) {
//     return <h1>Meal not found</h1>;
//   }

//   if (!template) {
//     return <h1>Template not found</h1>;
//   }



//   const handleSizeClick = (index: number) => {
//     setSelectedSize(index);
//   };

//   return (
//     <div
//       className="absolute w-full min-h-full"
//       style={{ backgroundColor: template.backgroundColor }}
//     >
//       {/* header section */}
//       <header className="flex items-center justify-between p-5">
//         <div className="size-10">
//           <BackIcon size="100%" color={template.backIcon.color} />
//         </div>
//         <p className="text-2xl" style={{ color: "white" }}>
//           23$
//         </p>
//       </header>

//       <div className="p-5">
//         {/* details section */}
//         <Image
//           src={selectedMeal.imageUrl}
//           alt={`${selectedMeal?.name}-img`}
//           width={220}
//           height={220}
//           className="rounded-full m-auto"
//           priority
//         />
//         <div className="text-center">
//           <h3 className="text-3xl mt-5" style={{ color: template.name.color }}>
//             {selectedMeal.name}
//           </h3>
//           <p
//             className="text-sm leading-loose mt-4"
//             style={{ color: template.description.color }}
//           >
//             {selectedMeal.description}
//           </p>
//         </div>
//       </div>

//       {/* quantity section */}
//       <hr style={{ borderColor: "#393939" }} />
//       <div className="flex justify-between p-4 items-center">
//         <span style={{ color: "white" }}>Quantity : {quantity}</span>
//         <div className="flex gap-3">
//           <div onClick={() => setQuantity(quantity - 1)}>
//             <MinusIcon size="50px" color="white" />
//           </div>
//           <div onClick={() => setQuantity(quantity + 1)}>
//             <PlusIcon size="50px" color="white" />
//           </div>
//         </div>
//       </div>
//       <hr style={{ borderColor: "#393939" }} />

//       {/* size section */}
//       <div className="grid grid-cols-3 gap-4 p-4 mt-5">
//         {selectedMeal.size.map((size, index) => (
//           <div
//             className="text-center p-2.5 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
//             key={size.size}
//             onClick={() => handleSizeClick(index)}
//             style={{
//               backgroundColor:
//                 selectedSize === index
//                   ? template.sizeSelectedBackground
//                   : template.sizeBackground,
//               color:
//                 selectedSize === index
//                   ? template.sizeSelectedText.color
//                   : template.sizeText.color,
//               border: `${
//                 selectedSize === index
//                   ? template.sizeBorder.size
//                   : template.sizeBorder.size
//               } solid  ${
//                 selectedSize === index
//                   ? template.sizeSelectedBorder
//                   : template.sizeBorder.color
//               }`,
//             }}
//           >
//             <span>{size.size}</span>
//           </div>
//         ))}
//       </div>

//       {/* footer section */}
//       <div className="absolute bottom-0 w-full p-5">
//         <div
//           className="flex justify-center items-center gap-2 p-4 rounded-3xl"
//           style={{
//             backgroundColor: template.footerBackground,
//             border: `${template.footerBorder.size} solid ${template.footerBorder.color}`,
//             color: template.footerText.color,
//           }}
//         >
//           <p>Bookmark This Meal</p>
//           <div>
//             <BookMarkIcon
//               size="24px"
//               color={template.footerIcon.color}
//               shape={template.footerIcon.shape}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;

import React from 'react'

const Details = () => {
  return (
    <div>Details</div>
  )
}

export default Details