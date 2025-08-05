"use client";
import BackIcon from "@/utils/icons/BackIcon";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const TemplatePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const templateData = {
    id: searchParams.get("id"),
    name: searchParams.get("name"),
    description: searchParams.get("description"),
    imageURL: searchParams.get("imageURL"),
    price: searchParams.get("price"),
  };

  const templatePrice =
    Number(templateData.price) === 0 ? "FREE" : templateData.price;

  // const handleBuyNow = async () => {
  //   try {
  //     const buyTemplate = await dispatch(
  //       purchaseTemplate(templateData.id || "")
  //     ).unwrap();

  //   } catch (error) {
  //
  //   }
  // };

  return (
    <div className="p-4">
      {/* header */}
      <header>
        <div className="size-10" onClick={() => router.back()}>
          <BackIcon color="#E55656" />
        </div>
      </header>

      {/* body */}
      <div className="mt-9">
        <Image
          src={templateData.imageURL || ""}
          alt={`${templateData.name}-img`}
          className="w-full rounded-2xl mb-5"
          width={350}
          height={100}
        />
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-2xl">{templateData.name}</h2>
          <p className="">{templateData.description}</p>

          <button className="bg-custom-gey-1 p-1 min-w-20 rounded text-custom-red-4 font-medium">
            {templatePrice}
          </button>
        </div>

        {/* cart & live view buttons */}
        <div className="flex justify-between items-center mt-10">
          <button
            // onClick={handleBuyNow}
            className="bg-custom-red-4 text-custom-white-1 p-3 rounded-lg min-w-36"
          >
            buy now
          </button>
          <button className="bg-custom-red-4 text-custom-white-1 p-3 rounded-lg min-w-36">
            Live View
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
