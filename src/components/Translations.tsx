import {
  addMealsLanguagesTranslationAPI,
  deleteRestaurantLanguageAPI,
  updateSelectedLanguageAPI,
} from "@/res/api";
import { getAllRestaurantMealsThunk } from "@/store/meal/mealThunks";
import {
  addOrUpdateRestaurantLanguagesTranslationThunk,
  getAllUserRestaurantsAPI,
} from "@/store/restaurant/restaurantThunk";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteConfirmationModal from "./DeleteConformationModal";
import { useTranslations } from "next-intl";
import ErrorModal from "./ErrorModal";

interface Language {
  lang: string;
  dir: "ltr" | "rtl";
  isDefault?: boolean;
  _id: string;
}

interface Meal {
  _id: string;
  name: string;
  description: string;
  category: string;
  translations?: Record<
    string,
    { name: string; description: string; category: string }
  >;
}

interface Restaurant {
  _id: string;
  restaurantName: string;
  businessUrl: string;
  languages?: Language[];
}

// interface TranslationFormData {
//   name: string;
//   description: string;
//   category: string;
// }

const Translations = () => {
  // Redux state
  const Translations = useTranslations("Translations");
  const { meals } = useAppSelector((state) => state.meal);
  const { restaurants } = useAppSelector((state) => state.restaurant);
  const dispatch = useDispatch<AppDispatch>();

  // Local state
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLanguageOptions, setSelectedLanguageOptions] =
    useState<Language | null>(null);
  const [isDefaultLanguage, setIsDefaultLanguage] = useState<boolean>(false);
  const [newLanguage, setNewLanguage] = useState("");
  const [newLanguageDir, setNewLanguageDir] = useState("ltr");

  const [showAddLanguage, setShowAddLanguage] = useState<boolean>(false);
  const [editingLanguage, setEditingLanguage] = useState<string | null>(null);
  const [editLanguageDir, setEditLanguageDir] = useState("ltr");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteConformation, setDeleteConformation] = useState(false);
  const [error, setError] = useState<string>("");

  // Get available languages from selected restaurant
  // const availableLanguages =
  //   selectedRestaurant?.languages || [];
  const availableLanguages = useMemo(() => {
    return selectedRestaurant?.languages || [];
  }, [selectedRestaurant?.languages]);

  // Fetch restaurants and meals
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUserRestaurantsAPI());
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchMeals = async () => {
      if (selectedRestaurant) {
        try {
          await dispatch(getAllRestaurantMealsThunk(selectedRestaurant._id));
          setSelectedMeal(null);
          // Set the first language as selected if available
          if (availableLanguages.length > 0) {
            setSelectedLanguage(availableLanguages[0].lang);
            setSelectedLanguageOptions(availableLanguages[0]);
          }
        } catch (error) {
          console.error("Error fetching meals:", error);
        }
      }
    };
    fetchMeals();
  }, [dispatch, selectedRestaurant, availableLanguages]);

  // Update form data when translation changes
  useEffect(() => {
    if (selectedMeal && selectedLanguage) {
      const translation = selectedMeal.translations?.[selectedLanguage] || {
        name: "",
        description: "",
        category: "",
      };
      setFormData(translation);
    }
  }, [selectedMeal, selectedLanguage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const deleteLanguage = async (lang: string) => {
    try {
      const response = await deleteRestaurantLanguageAPI({
        restaurantId: selectedRestaurant?._id ?? "",
        lang,
      });

      setSelectedRestaurant(response.restaurant);

      // // Refresh restaurant data
      // await dispatch(getAllUserRestaurantsAPI());
      // Reset selected language if it was the deleted one
      if (selectedLanguage === lang) {
        setSelectedLanguage(null);
      }
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  const startEditingLanguage = (lang: string) => {
    const languageToEdit = availableLanguages.find(
      (l: { lang: string }) => l.lang === lang
    );
    if (languageToEdit) {
      setEditingLanguage(lang);
      setEditLanguageDir(languageToEdit.dir);
    }
  };

  const cancelEditingLanguage = () => {
    setEditingLanguage(null);
    setEditLanguageDir("ltr");
    setSelectedFile(null);
    setNewLanguage("");
  };

  const saveLanguageChanges = async (langId: string) => {
    const formDataBody = new FormData();
    formDataBody.append("lang", newLanguage);
    formDataBody.append("dir", editLanguageDir);
    formDataBody.append("langId", langId);
    if (selectedFile) {
      formDataBody.append("icon", selectedFile);
    }

    try {
      const response = await updateSelectedLanguageAPI(
        selectedRestaurant?._id || "",
        formDataBody
      );

      // Update the selected restaurant with the new language
      setSelectedRestaurant(response.restaurant);
    } catch (error) {
      console.error("Error updating language:", error);
    } finally {
      setEditingLanguage(null);
      setEditLanguageDir("ltr");
      setSelectedFile(null);
      // Refresh restaurant data
      await dispatch(getAllUserRestaurantsAPI());
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedMeal || !selectedRestaurant) return;

    try {
      await addMealsLanguagesTranslationAPI({
        mealId: selectedMeal._id,
        lang: selectedLanguage ?? "",
        dir: newLanguageDir,
        translation: formData,
      });

      // Update the selected meal with the new translations
      setSelectedMeal((prev) => {
        if (!prev || !selectedLanguage) return prev;
        return {
          ...prev,
          translations: {
            ...(prev.translations || {}),
            [selectedLanguage]: formData,
          },
        };
      });
      // setSelectedMeal((prev) => ({
      //   ...prev,
      //   translations: {
      //     ...prev.translations,
      //     [selectedLanguage]: formData,
      //   },
      // }));
    } catch (error) {
      console.error("Error saving translation:", error);
    }
  };

  const addNewLanguage = async () => {
    if (
      newLanguage &&
      !availableLanguages.some((l: { lang: string }) => l.lang === newLanguage)
    ) {
      try {
        // await addOrUpdateRestaurantLanguagesTranslationAPI({
        //   restaurantId: selectedRestaurant?._id ?? "",
        //   lang: newLanguage,
        //   dir: newLanguageDir,
        // });
        const response = await dispatch(
          addOrUpdateRestaurantLanguagesTranslationThunk({
            restaurantId: selectedRestaurant?._id || "",
            lang: newLanguage,
            dir: newLanguageDir,
          })
        ).unwrap();

        setSelectedRestaurant(response.restaurant);

        // If the new language is added successfully, update the state

        // // Refresh restaurant data to get the updated languages
        // await dispatch(getAllUserRestaurantsAPI());

        setSelectedLanguage(newLanguage);
        setNewLanguage("");
        setNewLanguageDir("ltr");
        setShowAddLanguage(false);
      } catch (error) {
        // console.error("Error adding new language:", error);
        const errorMsg =
          error instanceof Error
            ? JSON.parse(error.message)
            : "Unknown error occurred";
        setError(errorMsg.message || "Failed to add new language");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 xl:p-6">
      <div className="xl:max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-custom-red-4 text-white">
          <h1 className="text-2xl font-bold">{Translations("title")}</h1>
          <p className="opacity-90">{Translations("titleParagraph")}</p>
        </div>

        {/* Restaurant and Meal Selection */}
        <div className="p-6 border-b grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="restaurant"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {Translations("selectRestaurant")}
            </label>
            <select
              id="restaurant"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedRestaurant?._id || ""}
              onChange={(e) => {
                const restaurant = restaurants?.find(
                  (r) => r._id === e.target.value
                );
                setSelectedRestaurant(restaurant || null);
              }}
            >
              <option>{Translations("selectRestaurantOption")}</option>
              {restaurants?.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.restaurantName} ({restaurant.businessUrl})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="meal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {Translations("selectMeal")}
            </label>
            <select
              id="meal"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedMeal?._id || ""}
              onChange={(e) => {
                const meal = meals?.find((m) => m._id === e.target.value);
                setSelectedMeal(meal || null);
              }}
              disabled={!selectedRestaurant}
            >
              <option value="">{Translations("selectMealOption")}</option>
              {meals?.map((meal) => (
                <option key={meal._id} value={meal._id}>
                  {meal.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Languages Section */}
        {selectedRestaurant && (
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-700">
                {Translations("restaurantLanguages")}
              </h2>
              <button
                type="button"
                onClick={() => setShowAddLanguage(!showAddLanguage)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
              >
                {showAddLanguage
                  ? Translations("cancel")
                  : Translations("addLanguage")}
              </button>
            </div>

            {/* Add Language Input */}
            {showAddLanguage && (
              <div className="mb-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {Translations("languageName")}
                    </label>
                    <input
                      type="text"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      placeholder="Enter language code"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {Translations("textDirection")}
                    </label>
                    <select
                      value={newLanguageDir}
                      onChange={(e) => setNewLanguageDir(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="ltr">{Translations("ltr")}</option>
                      <option value="rtl">{Translations("rtl")}</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addNewLanguage}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={!newLanguage}
                >
                  {Translations("addLanguageButton")}
                </button>
              </div>
            )}

            {/* Language Buttons */}
            <div className="flex flex-wrap gap-2">
              {availableLanguages.map((language: Language) => (
                <div key={language.lang} className="relative group">
                  {editingLanguage === language.lang ? (
                    <div className="flex flex-col gap-2 bg-white p-3 rounded-md border border-gray-300 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            {Translations("languageName")}
                          </label>
                          <input
                            type="text"
                            // value={newLanguage} // TODO add the selected language
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            {Translations("textDirection")}
                          </label>
                          <select
                            value={editLanguageDir}
                            onChange={(e) => setEditLanguageDir(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                          >
                            <option value="ltr">{Translations("ltr")}</option>
                            <option value="rtl">{Translations("rtl")}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            {Translations("languageIcon")}
                          </label>
                          <div className="flex items-center gap-2">
                            <label className="flex-1 cursor-pointer">
                              <div className="px-2 py-1 text-sm border border-gray-300 rounded flex items-center justify-between hover:bg-gray-50">
                                <span className="text-gray-500 truncate">
                                  {selectedFile
                                    ? selectedFile.name
                                    : Translations("chooseIconFile")}
                                </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 100 * 1024) {
                                      // 100KB limit
                                      alert("Icon must be smaller than 100KB"); //TODO set error message for it
                                      return;
                                    }
                                    setSelectedFile(file);
                                  }
                                }}
                                accept=".png,.jpg,.jpeg,.svg"
                              />
                            </label>
                            {selectedFile && (
                              <button
                                type="button"
                                onClick={() => setSelectedFile(null)}
                                className="p-1 text-gray-400 hover:text-gray-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
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
                              </button>
                            )}
                          </div>
                          {selectedFile && (
                            <p
                              className={`mt-1 text-xs ${
                                selectedFile.size > 100 * 1024
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {selectedFile.name} (
                              {Math.round(selectedFile.size / 1024)} KB)
                              {selectedFile.size > 100 * 1024 && (
                                <span className="block">
                                  {Translations("iconFileSize")}
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={cancelEditingLanguage}
                          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
                        >
                          {Translations("cancel")}
                        </button>
                        <button
                          onClick={() => saveLanguageChanges(language._id)}
                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                          // disabled={!newLanguage}
                        >
                          {Translations("save")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLanguage(language.lang);
                          setSelectedLanguageOptions(language);
                          setIsDefaultLanguage(language.isDefault || false);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                          selectedLanguage === language.lang
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {language.lang}
                        {selectedMeal?.translations?.[language.lang] && (
                          <span className="ml-1">✓</span>
                        )}
                      </button>
                      {!language.isDefault ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => startEditingLanguage(language.lang)}
                            className="p-1.5 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100"
                            title="Edit language"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              // deleteLanguage(language.lang)
                              setSelectedLanguage(language.lang);
                              setDeleteConformation(true);
                            }}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100"
                            title="Delete language"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={() => startEditingLanguage(language.lang)}
                            className="p-1.5 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100"
                            title="Edit language"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Translation Form */}
        {selectedRestaurant &&
          selectedMeal &&
          selectedLanguage &&
          selectedLanguage &&
          !isDefaultLanguage &&
          !selectedLanguageOptions?.isDefault && (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-700">
                {selectedMeal.translations?.[selectedLanguage]
                  ? Translations("editMealTranslation")
                  : Translations("addMealTranslation")}{" "}
                - {selectedLanguage}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (
                  {availableLanguages
                    .find((l: { lang: string }) => l.lang === selectedLanguage)
                    ?.dir.toUpperCase()}
                  )
                </span>
              </h2>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      {Translations("mealName")}
                    </label>
                    <span className="text-xs text-gray-500">
                      {`${Translations("default")} "${selectedMeal.name}"`}
                    </span>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-custom-red-4 focus:border-custom-red-4"
                    // placeholder={`Translation for "${selectedMeal.name}"`}
                    required
                  />
                </div>

                {/* Description Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700"
                    >
                      {Translations("description")}
                    </label>
                    <span className="text-xs text-gray-500">
                      {`${Translations("default")} "${
                        selectedMeal.description
                      }"`}
                    </span>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-custom-red-4 focus:border-custom-red-4"
                    // placeholder={`Translation for "${selectedMeal.description}"`}
                    required
                  />
                </div>

                {/* Category Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-700"
                    >
                      {Translations("category")}
                    </label>
                    <span className="text-xs text-gray-500">
                      {`${Translations("default")} "${selectedMeal.category}"`}
                    </span>
                  </div>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-custom-red-4 focus:border-custom-red-4"
                    // placeholder={`Translation for "${selectedMeal.category}"`}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setSelectedMeal(null)}
                >
                  {Translations("backToMeals")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-custom-red-4 rounded-md text-sm font-medium text-white hover:bg-custom-red-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {Translations("saveTranslation")}
                </button>
              </div>
            </form>
          )}

        {/* Existing Translations Preview */}
        {selectedRestaurant && selectedMeal && (
          <div className="p-6 bg-gray-50 border-t">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {Translations("currentTranslations")}
            </h2>
            {selectedMeal.translations &&
            Object.keys(selectedMeal.translations).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(selectedMeal.translations).map(
                  ([lang, translation]) => {
                    const languageInfo = availableLanguages.find(
                      (l: { lang: string }) => l.lang === lang
                    );
                    return (
                      <div
                        key={lang}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                        dir={languageInfo?.dir || "ltr"}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-indigo-600">
                            {lang} ({languageInfo?.dir.toUpperCase()})
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              lang === selectedLanguage
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {lang === selectedLanguage
                              ? Translations("editing")
                              : Translations("saved")}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>
                            <span className="font-medium">
                              {Translations("name")}
                            </span>{" "}
                            {translation.name}
                          </p>
                          <p>
                            <span className="font-medium">
                              {Translations("descriptionText")}
                            </span>{" "}
                            {translation.description}
                          </p>
                          <p>
                            <span className="font-medium">
                              {Translations("categoryText")}
                            </span>{" "}
                            {translation.category}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <p className="text-gray-500">
                {Translations("notTranslationAdded")}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConformation && (
        <DeleteConfirmationModal
          isOpen={deleteConformation}
          onClose={() => setDeleteConformation(false)}
          onConfirm={() => {
            if (selectedLanguage) {
              deleteLanguage(selectedLanguage);
            }
            setDeleteConformation(false);
          }}
          mealName={`this language "${selectedLanguage || ""}"`}
          actionName={"this language"}
        />
      )}

      {/* Error Message */}
      {error && (
        <ErrorModal
          error={error}
          onClose={() => setError("")}
          errSolution="Please upgrade you plan to access this feature."
          errorFallback="An error occurred while processing your request."
        />
      )}
    </div>
  );
};

export default Translations;
