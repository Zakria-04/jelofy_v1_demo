import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { getAllStoreTemplatesAPI } from "@/store/template-store/templateStoreThunks";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import TemplateCard from "./TemplateCard";

const Templates = () => {
  const Templates = useTranslations("Templates");
  const dispatch = useDispatch<AppDispatch>();
  const { templateLists } = useAppSelector((state) => state.templateStore);

  useEffect(() => {
    const fetchAllTemplates = async () => {
      try {
        const response = await dispatch(getAllStoreTemplatesAPI()).unwrap();
        return response;
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchAllTemplates();
  }, [dispatch]);

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-6">{Templates("title")}</h1>

      {/* New templates announcement */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Exciting Updates Coming Soon!
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                We&apos;re working on new templates with advanced features
                including:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Add to cart functionality</li>
                <li>Meal booking systems</li>
                <li>Automated total calculation</li>
                <li>Smart order separation</li>
              </ul>
              <p className="mt-2">
                Stay tuned for these powerful additions to our template
                collection!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateLists?.map((template) => (
          <TemplateCard key={template._id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default Templates;
