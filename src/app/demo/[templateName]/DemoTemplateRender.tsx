// "use client";
// import SimpleBites from "@/components/templates/SimpleBites/SimpleBites";
// import { getDemoMealsAPI } from "@/res/api";
// import { Meals, Template } from "@/store/store/storeSlice";
// import React, { useEffect, useState } from "react";

// // const DemoTemplateRender = ({ templateName }: { templateName: string }) => {
// //   const templates: Record<string, React.FC<any>> = {
// //     SimpleBites: SimpleBites,
// //   };

// //   const TemplateComponent = templates[templateName];
// //   if (!TemplateComponent) return;

// //   return <TemplateComponent demoRestaurantId="demo-id" isDemo />;
// // };

// // export default DemoTemplateRender;

// // Define the props all templates share
// type TemplateProps = {
//   isDemo?: boolean;
//   demoTemplate: Template;
//   demoMeals: Meals[];
//   demoRestaurantLanguages: { lang: string; dir: string; iconUrl: string }[];
// };

// const templates: Record<string, React.FC<TemplateProps>> = {
//   SimpleBites: SimpleBites,
// };

// const DemoTemplateRender = ({ templateName }: { templateName: string }) => {
//   const TemplateComponent = templates[templateName];
//   // if (!TemplateComponent) return null;

//   const [demoMeals, setDemoMeals] = useState([]);

//   const demoTemplate = {
//     backgroundColor: { color: "#1C1C1C", disable: false },
//     backgroundImage: { url: "", disable: true },
//     header: {
//       backgroundColor: { color: "transparent" },
//       logoText: {
//         name: "Burger Palace",
//         color: "#FDFAF6",
//         disable: false,
//       },
//       logoUrl: {
//         url: "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1747643762/burger_3_r7b54a.png",
//         disable: false,
//       },
//       contactInformation: {
//         name: "call-us",
//         phone: "+1 234 567 890",
//         color: "#9D3737",
//         iconColor: "#9D3737",
//         disable: false,
//       },
//     },
//     category: {
//       backgroundColorSelected: { color: "#9D3737" },
//       backgroundColor: { color: "transparent" },
//       borderSelected: { size: "1px", color: "#FDFAF6" },
//       border: { size: "1px", color: "#9D3737" },
//       textColorSelected: { color: "#FDFAF6" },
//       textColor: { color: "#E55656" },
//       enabled: true,
//     },
//     mealsContainer: {
//       backgroundColor: { color: "#1E1E1E" },
//       mealName: { color: "#FDFAF6", disable: false },
//       mealImageSize: { size: "150px", radius: "0px", disable: false },
//       mealDescription: { color: "#FDFAF6", disable: false },
//       mealPrice: { color: "#9D3737", disable: false },
//       // mealQuantity: { color: "#F9F9F9", disable: false },
//       mealBorder: { size: "1px", color: "#3B2424", disable: false },
//       mealSize: {
//         color: "#9D3737",
//         border: "1px solid #9D3737",
//       },
//     },

//     languageModal: {
//       backgroundColor: { color: "#1C1C1C" },
//       textColor: { color: "#FDFAF6" },
//     },
//   };

//   useEffect(() => {
//     const fetchDemoMeals = async () => {
//       try {
//         const mealResponse = await getDemoMealsAPI();
//         if (mealResponse) {
//           setDemoMeals(mealResponse);
//         }
//       } catch {
//         setDemoMeals([]);
//       }
//     };

//     fetchDemoMeals();
//   }, []);

//   return (
//     <TemplateComponent
//       isDemo={true}
//       demoTemplate={demoTemplate}
//       demoRestaurantLanguages={[
//         {
//           lang: "English",
//           dir: "ltr",
//           iconUrl:
//             "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1749382359/language_1_yqqmvl.png",
//         },
//         {
//           lang: "Arabic",
//           dir: "rtl",
//           iconUrl:
//             "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1749382359/language_1_yqqmvl.png",
//         },
//       ]}
//       demoMeals={demoMeals}
//     />
//   );
// };

// export default DemoTemplateRender;

"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getDemoMealsAPI } from "@/res/api";
import { Meals, Template } from "@/store/store/storeSlice";
import React, { Suspense, useEffect, useState } from "react";
// Create or import a loading component

type TemplateProps = {
  isDemo?: boolean;
  demoTemplate: Template;
  demoMeals: Meals[];
  demoRestaurantLanguages: { lang: string; dir: string; iconUrl: string }[];
};

const templates: Record<string, React.FC<TemplateProps>> = {
  SimpleBites: React.lazy(
    () => import("@/components/templates/SimpleBites/SimpleBites")
  ),
  Velora: React.lazy(() => import("./DemoVelora")),
};

const DemoTemplateRender = ({ templateName }: { templateName: string }) => {
  const TemplateComponent = templates[templateName];
  const [demoMeals, setDemoMeals] = useState<Meals[] | null>(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const demoTemplate = {
    backgroundColor: { color: "#1C1C1C", disable: false },
    backgroundImage: { url: "", disable: true },
    header: {
      backgroundColor: { color: "transparent" },
      logoText: {
        name: "Burger Palace",
        color: "#FDFAF6",
        disable: false,
      },
      logoUrl: {
        url: "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1747643762/burger_3_r7b54a.png",
        disable: false,
      },
      contactInformation: {
        name: "call-us",
        phone: "+1 234 567 890",
        color: "#9D3737",
        iconColor: "#9D3737",
        enabled: true,
        disable: false,
      },
    },
    category: {
      backgroundColorSelected: { color: "#9D3737" },
      backgroundColor: { color: "transparent" },
      borderSelected: { size: "1px", color: "#FDFAF6" },
      border: { size: "1px", color: "#9D3737" },
      textColorSelected: { color: "#FDFAF6" },
      textColor: { color: "#E55656" },
      enabled: true,
    },
    mealsContainer: {
      backgroundColor: { color: "#1E1E1E" },
      mealName: { color: "#FDFAF6", disable: false },
      mealImageSize: { size: "150px", radius: "0px", disable: false },
      mealDescription: { color: "#FDFAF6", disable: false },
      mealPrice: { color: "#9D3737", disable: false },
      // mealQuantity: { color: "#F9F9F9", disable: false },
      mealBorder: { size: "1px", color: "#3B2424", disable: false },
      mealSize: {
        color: "#9D3737",
        border: "1px solid #9D3737",
      },
    },

    languageModal: {
      backgroundColor: { color: "#1C1C1C" },
      textColor: { color: "#FDFAF6" },
    },
  };

  useEffect(() => {
    const fetchDemoMeals = async () => {
      try {
        setLoading(true);
        const mealResponse = await getDemoMealsAPI();
        setDemoMeals(mealResponse || []);
      } catch (err) {
        setError("Failed to load demo meals");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDemoMeals();
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Or any loading UI
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!TemplateComponent) {
    return <div className="error-message">Template not found</div>;
  }

  return (
    <Suspense fallback={<h1>Loading Template...</h1>}>
      <TemplateComponent
        isDemo={true}
        demoTemplate={demoTemplate}
        demoRestaurantLanguages={[
          {
            lang: "English",
            dir: "ltr",
            iconUrl:
              "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1747653723/usa_wqtr5c.png",
          },
          {
            lang: "العربية",
            dir: "rtl",
            iconUrl:
              "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1749630740/flag_sjjte2.png",
          },
        ]}
        demoMeals={demoMeals || []}
      />
    </Suspense>
  );
};

export default DemoTemplateRender;
