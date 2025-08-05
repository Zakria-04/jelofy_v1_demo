"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { useAppSelector } from "@/store/store/storeSelectors";
import Category from "./components/Category";
import "./SimpleBites.css";
import LanguageModal from "./components/LanguageModal";
import Footer from "./components/Footer";
import RenderMeals from "./components/RenderMeals";
import { Meals, setIsDemo, setMeals, Template } from "@/store/store/storeSlice";
import { frontendDomain, getDemoMealsAPI, MainDomain } from "@/res/api";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useSearchParams } from "next/navigation";

interface SimpleBitesProps {
  isDemo?: boolean;
  demoTemplate?: Template;
  demoMeals?: Meals[];
  demoRestaurantLanguages?: {
    lang: string;
    dir: string;
    iconUrl: string;
  }[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const SimpleBites = ({
  isDemo,
  demoMeals,
  demoTemplate,
  demoRestaurantLanguages,
}: SimpleBitesProps) => {
  const searchParams = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const { template, meals, restaurantId, restaurantLanguages, currency } =
    useAppSelector((state) => state.store);

  const restaurantLanguagesList =
    restaurantLanguages || demoRestaurantLanguages || [];

  const [languageModal, setLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<{
    lang: string;
    dir: string;
    iconUrl: string;
  }>(restaurantLanguagesList[0]);

  const [selectedCategoryList, setSelectedCategoryList] = useState("");
  const isDemoFromQuery = searchParams.get("demo") !== null;

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== frontendDomain) return;
      if (window.self !== window.top) {
        const { type, template, meals } = event.data;

        if (type === "template-update") {
          dispatch(setIsDemo(template));
          dispatch(setMeals(meals));
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  useEffect(() => {
    const fetchDemoMeals = async () => {
      if (isDemoFromQuery) {
        const demoMealsResponse = await getDemoMealsAPI();
        dispatch(setMeals(demoMealsResponse));
      }
    };

    fetchDemoMeals();
  }, [isDemoFromQuery, dispatch]);

  // console.log("recivedMessage", recivedMessage);

  const simpleBitesMeals = isDemo ? demoMeals : meals;
  const simpleBitesTemplate = isDemo ? demoTemplate : template;
  const categoryEnabled = template?.category?.enabled !== false;

  useEffect(() => {
    if (!categoryEnabled || !simpleBitesMeals || simpleBitesMeals.length === 0)
      return;

    const translatedCategory =
      simpleBitesMeals[0]?.translations?.[selectedLanguage?.lang]?.category;

    if (translatedCategory) {
      setSelectedCategoryList(translatedCategory);
    } else {
      setSelectedCategoryList(simpleBitesMeals[0]?.category || "");
    }
  }, [selectedLanguage, simpleBitesMeals, categoryEnabled]);

  useEffect(() => {
    const sourceMeals = isDemo ? demoMeals : meals;
    if (sourceMeals && sourceMeals?.length > 0 && sourceMeals[0].category) {
      setSelectedCategoryList(sourceMeals[0].category);
    }
  }, [isDemo, demoMeals, meals]);

  useEffect(() => {
    const eventSource = new EventSource(`${MainDomain}/sse/${restaurantId}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      return data;
    };

    return () => {
      eventSource.close();
    };
  }, [restaurantId]);

  if (!simpleBitesMeals || !simpleBitesTemplate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-screen"
      >
        Loading...
      </motion.div>
    );
  }

  const filteredMeals = categoryEnabled
    ? simpleBitesMeals.filter((meal) => {
        if (
          selectedLanguage?.lang &&
          meal?.translations?.[selectedLanguage.lang]?.category
        ) {
          return (
            meal.translations[selectedLanguage.lang].category ===
            selectedCategoryList
          );
        }
        return meal.category === selectedCategoryList;
      })
    : simpleBitesMeals;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      dir={selectedLanguage?.dir || "ltr"}
      className={`absolute w-full min-h-full ${isDemoFromQuery ? "pt-4" : ""}`}
      style={{ backgroundColor: simpleBitesTemplate?.backgroundColor?.color }}
    >
      <Header
        setLanguageModal={setLanguageModal}
        selectedLanguage={selectedLanguage}
        restaurantLanguages={restaurantLanguagesList}
        headerTemplate={simpleBitesTemplate?.header}
      />

      <Category
        selectedLanguage={selectedLanguage?.lang}
        meals={simpleBitesMeals}
        setSelectedCategoryList={setSelectedCategoryList}
        category={simpleBitesTemplate?.category}
      />

      <RenderMeals
        selectedLanguage={selectedLanguage?.lang}
        meals={filteredMeals}
        mealContainer={simpleBitesTemplate?.mealsContainer}
        currency={currency}
      />

      <Footer
        headerTemplate={simpleBitesTemplate?.header?.contactInformation}
      />

      <AnimatePresence>
        {languageModal && restaurantLanguagesList?.length > 1 && (
          <LanguageModal
            setLanguageModal={setLanguageModal}
            setSelectedLanguage={setSelectedLanguage}
            languages={restaurantLanguagesList}
            languageModalTemplate={simpleBitesTemplate?.languageModal}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SimpleBites;
