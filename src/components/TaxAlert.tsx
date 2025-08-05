import { useTranslations } from "next-intl";
import React from "react";

const TaxAlert = () => {
  const TaxAlert = useTranslations("TaxAlert");
  return (
    <div className="bg-yellow-50 text-yellow-900 border-l-4 border-yellow-500 p-4 mt-20 mb-20 rounded-md shadow-sm text-center max-w-3xl lg:max-w-5xl xl:max-w-3xl mx-auto">
      <p className="text-lg font-medium sm:text-xl lg:text-3xl xl:text-2xl">
        {TaxAlert("text")}
      </p>
      <p className="text-sm mt-2 sm:text-base lg:text-xl xl:text-lg">
        {TaxAlert("textParagraph")}
      </p>
    </div>
  );
};

export default TaxAlert;
