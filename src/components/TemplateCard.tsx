import { useTranslations } from "next-intl";
import React, { useState } from "react";
import UseTemplateModal from "./UseTemplateModal";
import Link from "next/link";
import Image from "next/image";
import { applyTemplate } from "@/res/api";
import ErrorModal from "./ErrorModal";
import ApiRequestSuccess from "./ApiRequestSuccess";

interface TemplateCardProps {
  template: {
    name: string;
    description: string;
    features: string[];
    templateService: string;
    requiresSubscription: boolean;
    category: string;
    popularity: number;
    imageURL: string;
  };
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const Templates = useTranslations("Templates");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState(false);

  const handleApplyTemplate = async (
    restaurantId: string,
    newTemplateName: string
  ) => {
    setShowModal(false);
    try {
      const response = await applyTemplate(newTemplateName, restaurantId);
      if (response.success) {
        setApiSuccess(true);
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? JSON.parse(error.message).message
          : "An error occurred";
      setError(errorMsg);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col min-h-[400px] h-full">
      {/* Header with optional category tag */}

      {template.requiresSubscription && (
        <div className="bg-gradient-to-br mb-7 from-amber-400 to-custom-red-4 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md relative overflow-hidden">
          <span className="text-amber-300 mr-1">✦</span> PREMIUM COLLECTION
          <div className="absolute top-0 left-0 w-3 h-full bg-white opacity-30 animate-shine" />
        </div>
      )}
      <div className="flex justify-between items-start mb-3">
        {template.category && (
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {template.category}
          </span>
        )}
        {template.popularity && (
          <div className="flex items-center text-yellow-500">
            <span className="mr-1">★</span>
            <span className="text-xs text-gray-500">{template.popularity}</span>
          </div>
        )}
      </div>

      {/* Template details - flex-grow allows this to expand */}
      <div className="flex-grow">
        <h3 className="font-bold text-xl mb-3 text-gray-800">
          {template.name}
        </h3>
        <p className="mb-4 text-gray-600 text-sm leading-relaxed line-clamp-3">
          {template.description}
        </p>

        <div>
          <Image
            alt={`${template.name}-template`}
            width={250}
            height={250}
            src={template.imageURL}
            className="m-auto rounded-xl size-auto"
            priority
          />

          {/* {!template.isActive && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md z-10 animate-pulse">
              🚧 Under Construction
            </div>
          )} */}
        </div>

        <div className="mb-5">
          <h4 className="font-medium text-gray-700 text-sm mb-2">
            {/* {Templates("features")}: */}
          </h4>
          <ul className="space-y-1 max-h-[120px] overflow-y-auto pr-2">
            {template.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start text-sm text-gray-600"
              >
                <span className="text-custom-red-4 mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {template.templateService && (
          <>
            <h4 className="text-sm mb-1 text-gray-700">Perfect For:</h4>
            <p className="text-xs text-gray-500 mb-5 italic line-clamp-2">
              {template.templateService}
            </p>
          </>
        )}
      </div>

      {/* Buttons container - always at bottom */}
      <div className="flex justify-between items-center gap-4 mt-auto pt-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-custom-red-4 hover:bg-custom-red-5 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-1"
        >
          {Templates("useTemplate")}
        </button>
        <Link
          target="_blank"
          href={`${template.name !== "Goldenella" ? `/demo/${template.name}` : "/menu/goldenella"}`}
          className="bg-white border border-custom-red-4 text-custom-red-4 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-1 text-center"
        >
          {Templates("liveView")}
        </Link>
      </div>

      {showModal && (
        <UseTemplateModal
          onClose={() => setShowModal(false)}
          newTemplateName={template.name}
          onApply={handleApplyTemplate}
        />
      )}

      {error && (
        <ErrorModal
          error={error}
          errSolution="This template requires a subscription. Upgrade to access premium designs."
          onClose={() => setError(null)}
          errorFallback="An error occurred while applying the template."
        />
      )}

      {apiSuccess && (
        <ApiRequestSuccess
          templateName={template.name}
          onClose={() => setApiSuccess(false)}
        />
      )}
    </div>
  );
};

export default TemplateCard;
