"use client";
import { loginMangerAccountThunk } from "@/store/manager/managerThunk";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const RestaurantAuthSlug = () => {
  const ManagerAuth = useTranslations("ManagerAuth");
  const { restaurantSlug } = useParams<{ restaurantSlug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { error } = useAppSelector((state) => state.manager);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    // restaurantSlug: restaurantSlug || "",
  });

  // Update formData state when username or password changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //  const response = await loginManagerAccountAPI({
      //     userName: formData.username,
      //     password: formData.password,
      //   });
      const response = await dispatch(
        loginMangerAccountThunk({
          userName: formData.username,
          password: formData.password,
        })
      ).unwrap();

      if (response.success) {
        router.push(`/manager/${restaurantSlug}/meals`);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
    // setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-custom-red-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
            {ManagerAuth("title")}
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            {ManagerAuth("subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {ManagerAuth("userName")}
              </label>
              <input
                type="text"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-custom-red-4 outline-none transition-all"
                placeholder={ManagerAuth("userNamePlaceholder")}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  {ManagerAuth("password")}
                </label>
                {/* <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500">
                  Forgot?
                </a> */}
              </div>
              <input
                type="password"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-custom-red-4 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">
                {typeof error === "string" ? error : "An error occurred."}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-custom-red-4 hover:bg-custom-red-1 text-white font-medium rounded-lg transition-colors duration-200 ${
                isLoading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {ManagerAuth("loadingSignIn")}
                </span>
              ) : (
                ManagerAuth("signin")
              )}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500 cursor-default">
            {/* Need help?{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Contact support
            </a> */}
            <h3 className="text-custom-red-4">
              {ManagerAuth("forgotPassword")}
            </h3>
            <p className="text-gray-700 mt-2">
              {ManagerAuth("forgotParagraph")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAuthSlug;
