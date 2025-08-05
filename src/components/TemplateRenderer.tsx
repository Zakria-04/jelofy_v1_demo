// // "use client";
// // import dynamic from "next/dynamic";
// // import { useEffect, useState } from "react";
// // import { AppDispatch } from "@/store/store";
// // import { getRestaurantMenuAPI } from "@/store/store/storeThunks";
// // import { useDispatch } from "react-redux";

// // interface TemplateRendererProps {
// //   restaurantSlug: string;
// // }

// // export default function TemplateRenderer({
// //   restaurantSlug,
// // }: TemplateRendererProps) {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const [TemplateComponent, setTemplateComponent] =
// //     useState<React.ComponentType | null>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchRestaurantMenu = async () => {
// //       try {
// //         const response = await dispatch(getRestaurantMenuAPI(restaurantSlug));
// //         const restaurant = response.payload;

// //         if (!restaurant?.selectedTemplate) {
// //           throw new Error("Template not found");
// //         }

// //         const templateName = restaurant.selectedTemplate;

// //         // Dynamically import the selected template with better error handling
// //         const DynamicComponent = dynamic(
// //           () =>
// //             import(`@/components/templates/${templateName}/${templateName}`)
// //               .then((mod) => mod.default)
// //               .catch(() => {
// //                 throw new Error(`Failed to load template: ${templateName}`);
// //               }),
// //           {
// //             loading: () => <p>Loading template...</p>,
// //             ssr: false,
// //           }
// //         );

// //         setTemplateComponent(() => DynamicComponent);
// //       } catch (err) {
// //         console.error("Error loading template:", err);
// //         setError(
// //           err instanceof Error ? err.message : "Failed to load template"
// //         );
// //       }
// //     };

// //     fetchRestaurantMenu();
// //   }, [restaurantSlug, dispatch]);

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   return (
// //     <div>
// //       {TemplateComponent ? <TemplateComponent /> : <h1>Loading Template...</h1>}
// //     </div>
// //   );
// // }

"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { AppDispatch } from "@/store/store";
import { getRestaurantMenuAPI } from "@/store/store/storeThunks";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store/storeSelectors";

export default function TemplateRenderer({
  restaurantSlug,
}: {
  restaurantSlug: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { isActive, loading } = useAppSelector((state) => state.store);
  const [TemplateComponent, setTemplateComponent] =
    useState<React.ComponentType | null>(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      try {
        const restaurant = await dispatch(getRestaurantMenuAPI(restaurantSlug));
        if (!restaurant || !restaurant.payload?.selectedTemplate) {
          throw new Error("Template not found");
        }

        const templateName = restaurant.payload.selectedTemplate;

        // Dynamically import the selected template
        const DynamicComponent = dynamic(
          () =>
            import(`@/components/templates/${templateName}/${templateName}`),
          { ssr: false }
        );

        // TypeScript expects React.ComponentType for dynamic imports
        setTemplateComponent(() => DynamicComponent as React.ComponentType);
      } catch (error) {
        console.error("Error loading template:", error);
      } finally {
        setDataFetched(true);
      }
    };

    fetchRestaurantMenu();
  }, [restaurantSlug, dispatch]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-medium text-gray-700">Loading Menu...</h2>
        {/* <p className="text-gray-500">
          Please wait while we prepare your dining experience
        </p> */}
      </div>
    );
  }
  if (dataFetched && !isActive) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Restaurant Unavailable
        </h2>
        <p className="text-gray-600 max-w-md">
          This restaurant is currently not accepting orders. Please check back
          later.
        </p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <Suspense fallback={<h1>Loading Template...</h1>}>
      {TemplateComponent ? <TemplateComponent /> : null}
    </Suspense>
  );
}
