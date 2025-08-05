import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { getAllUserOwnedTemplatesAPI } from "@/store/template/templateThunks";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";

const MyTemplates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { purchasedTemplates } = useAppSelector((state) => state.template);

  useEffect(() => {
    const fetchAllUserOwnedTemplates = async () => {
      try {
        await dispatch(getAllUserOwnedTemplatesAPI()).unwrap();
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchAllUserOwnedTemplates();
  }, [dispatch]);

  if (!purchasedTemplates || purchasedTemplates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            You don&apos;t have any templates yet
          </h1>
          <p className="text-gray-600 mb-6">
            Browse our template store to find the perfect design for your needs.
          </p>
          <Link href="/templates/store">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Explore Templates Store
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Templates</h1>
        <p className="text-gray-600 mt-2">
          {purchasedTemplates.length} template
          {purchasedTemplates.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {purchasedTemplates.map(
          (
            template //TODO the purchasedTemplates is array of strings and not objects, so the server must send objects instead
          ) => (
            <div
              key={template.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                {template.previewImage && (
                  <Image
                    src={template.previewImage}
                    alt={template.name}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Simple Bites</span>
                  <Link href={`/templates/use/${template.id}`}>
                    <button className="px-4 py-2 bg-custom-red-4 text-white text-sm rounded transition-colors">
                      Use Template
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyTemplates;
