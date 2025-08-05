"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAppSelector } from "@/store/store/storeSelectors";
import { MainDomain } from "@/res/api";

const Velora = () => {
  const { meals, restaurantId, currency } = useAppSelector((state) => state.store);

  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const categories = [...new Set(meals?.map((meal) => meal.category))];
  const mealsByCategory = categories.map((category) => ({
    category,
    meals: meals?.filter((meal) => meal.category === category),
  }));

  const nextPage = () => {
    if (currentPage < mealsByCategory.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset animation state after page change completes
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Page transition variants
  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    }),
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
          <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
            }}
          >
            Jelofy
          </motion.span>
        </h1> */}

        {/* Book Container */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Book Spine with 3D effect */}
          <motion.div
            className="absolute left-0 top-0 h-full w-8 bg-gradient-to-b from-red-800 to-red-900 z-10"
            whileHover={{ width: 12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-bold rotate-90 origin-center whitespace-nowrap">
              MENU BOOK
            </div>
          </motion.div>

          {/* Page Content */}
          <div className="ml-8 p-8 min-h-[600px]">
            <AnimatePresence custom={currentPage} mode="wait">
              <motion.div
                key={currentPage}
                custom={currentPage}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="h-full"
              >
                <motion.h2
                  className="text-3xl font-bold mb-6 text-gray-800 capitalize"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {mealsByCategory[currentPage]?.category
                    .toLowerCase()
                    .replace("_", " ")}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mealsByCategory[currentPage]?.meals?.map((meal, index) => (
                    <motion.div
                      key={meal._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {meal.imageUrl && (
                        <motion.div
                          className="h-48 overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={meal.imageUrl}
                            width={500}
                            height={300}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                            priority
                          />
                        </motion.div>
                      )}
                      <div className="p-4">
                        <motion.h3
                          className="text-xl font-semibold text-gray-800"
                          // whileHover={{ color: "#dc2626" }}
                        >
                          {meal.name}
                        </motion.h3>
                        <p className="text-gray-600 mt-2">{meal.description}</p>

                        {meal.size && meal.size.length > 0 ? (
                          <motion.div
                            className="mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + 0.05 * index }}
                          >
                            <h4 className="font-medium text-gray-700">
                              Sizes & Prices:
                            </h4>
                            <ul className="mt-2 space-y-1">
                              {meal.size.map((size, i) => (
                                <motion.li
                                  key={i}
                                  className="flex justify-between"
                                  whileHover={{ scale: 1.02, x: 5 }}
                                >
                                  <span className="text-gray-600">
                                    {size.size}
                                    {/* {meal.unit ? ` ${meal.unit}` : ""} */}
                                  </span>
                                  <span className="font-medium text-red-600">
                                    {size.price.toFixed(2)} {currency || ""}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ) : (
                          <motion.p
                            className="mt-4 font-medium text-red-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + 0.05 * index }}
                          >
                            {meal.price?.toFixed(2)} {currency || ""}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page Navigation */}
          <div className=" ml-8 flex justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-300">
            <motion.button
              onClick={prevPage}
              disabled={currentPage === 0}
              whileTap={{ scale: 0.95 }}
              whileHover={currentPage === 0 ? {} : { scale: 1.05 }}
              className={`px-4 py-1 lg:py-2 rounded-md shadow ${
                currentPage === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              Previous
            </motion.button>

            <div className="flex items-center">
              {mealsByCategory.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => !isAnimating && setCurrentPage(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 mx-1 rounded-full ${
                    currentPage === index ? "bg-red-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextPage}
              disabled={currentPage === mealsByCategory.length - 1}
              whileTap={{ scale: 0.95 }}
              whileHover={
                currentPage === mealsByCategory.length - 1
                  ? {}
                  : { scale: 1.05 }
              }
              className={`px-4 py-1 lg:py-2 rounded-md shadow ${
                currentPage === mealsByCategory.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              Next
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Velora;
