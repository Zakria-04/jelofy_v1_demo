import Image from "next/image";
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createMealThunk, updateMealThunk } from "@/store/meal/mealThunks";

type MealFormData = {
  _id?: string;
  name: string;
  category?: string;
  description: string;
  price: string;
  image: File | null;
  previewImage: string | ArrayBuffer | null;
  active?: boolean;
  isAvailable?: boolean;
  size?: { size: string; price: string }[];
};

interface Meal {
  _id: string;
  name: string;
  description: string;
  category?: string;
  price: number;
  imageUrl: string;
  image?: string;
  previewImage?: string;
  size?: { size: string; price: string }[];
  isAvailable?: boolean;
}

interface MealModalProps {
  onClose: () => void;
  status: "create" | "update" | "delete";
  selectedMeal?: MealFormData | Meal;
  restaurantId?: string;
  setError: (error: string | null) => void;
}

const MealModal = ({
  onClose,
  status,
  selectedMeal,
  restaurantId,
  setError,
}: MealModalProps) => {
  const [formData, setFormData] = useState<MealFormData>({
    name: selectedMeal?.name || "",
    category: selectedMeal?.category || "",
    description: selectedMeal?.description || "",
    price: selectedMeal?.price?.toString() || "",
    image: null,
    active:
      status === "create"
        ? true
        : status === "update"
        ? selectedMeal?.isAvailable ?? false
        : false,
    previewImage: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const checkStatus = status === "create";
  const dispatch = useDispatch<AppDispatch>();

  const [sizes, setSizes] = useState<{ size: string; price: string }[]>(
    selectedMeal?.size || []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: MealFormData) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: MealFormData) => ({
          ...prev,
          image: file,
          previewImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      if (formData.category) {
        formDataToSubmit.append("category", formData.category);
      } else return;

      if (status === "create" && restaurantId) {
        formDataToSubmit.append("restaurantId", restaurantId);
      }

      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("price", formData.price);
      formDataToSubmit.append("active", formData.active ? "true" : "false");
      formDataToSubmit.append("sizes", JSON.stringify(sizes));

      if (formData.image) {
        formDataToSubmit.append("image", formData.image);
      }

      const submitAPI_Status =
        status === "create"
          ? dispatch(createMealThunk(formDataToSubmit)).unwrap()
          : dispatch(
              updateMealThunk({
                selectedMealId: selectedMeal?._id || "",
                formDataToSubmit: formDataToSubmit,
              })
            ).unwrap();

      submitAPI_Status
        .then(() => {
          setIsLoading(false);
          onClose();
        })
        .catch((error) => {
          setIsLoading(false);
          const errMessage =
            error instanceof Error
              ? JSON.parse(error.message).message ||
                error.message ||
                "An error occurred while processing your request"
              : "An unexpected error occurred";
          setError(errMessage);
          // Optionally, you can set an error state here to display an error message
        })
        .finally(() => {
          setFormData({
            name: "",
            category: "",
            description: "",
            price: "",
            image: null,
            previewImage: null,
          });
          onClose();
        });
    } catch {}
  };

  // Icons
  const CloseIcon = () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const UploadIcon = () => (
    <svg
      className="w-6 h-6 text-gray-500 mb-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
  );

  const DollarIcon = () => (
    <svg
      className="w-4 h-4 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  // const addSize = () => {
  //   setSizes([...sizes, { name: "", price: "" }]);
  // };
  const addSize = () => {
    setSizes([...sizes, { size: "", price: "" }]);
  };

  const removeSize = (index: number) => {
    const updated = sizes.filter((_, i) => i !== index);
    setSizes(updated);
  };

  const handleSizeChange = (
    index: number,
    field: "size" | "price",
    value: string | number
  ) => {
    const updated = [...sizes];
    updated[index][field] = value as string;
    setSizes(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Responsive Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {status === "create" ? "Add New Meal" : "Update Meal"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meal Image
            </label>
            <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-custom-red-4 transition-colors">
              {typeof formData.previewImage === "string" ? (
                <Image
                  src={formData.previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                  width={600}
                  height={300}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4">
                  <UploadIcon />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Click to upload or drag and drop
                  </p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          </div>

          {/* Name & Category in Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Meal Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-red-4"
                placeholder="Enter meal name"
                required={checkStatus}
              />
            </div>

            {/* Category Field */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-red-4"
                placeholder="Enter meal category"
                required={checkStatus}
              />
            </div>
          </div>

          {/* Size Options */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Size Options
            </label>
            <div className="max-h-28 overflow-y-auto space-y-2">
              {sizes.map((size, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Size"
                    value={size.size}
                    onChange={(e) =>
                      handleSizeChange(index, "size", e.target.value)
                    }
                    className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={size.price || ""}
                    onChange={(e) =>
                      handleSizeChange(
                        index,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
                    step="0.01"
                  />
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="p-1 text-red-500 hover:text-red-700 transition"
                    title="Remove size"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
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
              ))}
            </div>
            <button
              type="button"
              onClick={addSize}
              className="px-4 py-1 text-xs text-custom-red-4 border border-custom-red-4 rounded hover:bg-red-100 transition"
            >
              + Add Size
            </button>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-red-4"
              placeholder="Enter meal description"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarIcon />
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-red-4"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Status Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meal Status
            </label>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  formData.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {formData.active ? "Active" : "Inactive"}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, active: !prev.active }))
                }
                className={`px-4 py-1 rounded-md text-sm font-medium focus:outline-none transition-colors ${
                  formData.active
                    ? "bg-custom-red-1 text-white hover:bg-custom-red-4"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {formData.active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-5 sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-custom-red-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-custom-red-4 rounded-md text-sm font-medium text-white hover:bg-custom-red-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {status === "create" ? "Add Meal" : "Update Meal"}
            </button>
          </div>
        </form>
      </div>

      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default MealModal;
