import { checkIfUrlExistsAPI, updateRestaurantDetailsAPI } from "@/res/api";
import { deleteUserRestaurantThunk } from "@/store/restaurant/restaurantThunk";
import { AppDispatch } from "@/store/store";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ConformationModal from "./ConformationModal";
// import debounce from "lodash/debounce";

type Restaurant = {
  _id: string;
  restaurantName: string;
  businessUrl: string;
  selectedTemplate: string;
  isActive: boolean;
  qrCodeUrl: string;
};

interface RestaurantDetailsModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  // onUpdate: (updatedRestaurant: any) => void;
}

const RestaurantDetailsModal = ({
  restaurant,
  onClose,
}: // onUpdate,
RestaurantDetailsModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState<Restaurant>(
    restaurant
      ? { ...restaurant }
      : {
          _id: "",
          restaurantName: "",
          businessUrl: "",
          selectedTemplate: "",
          isActive: false,
          qrCodeUrl: "",
        }
  );
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [deleteConformationModal, setDeleteConformationModal] = useState(false);
  const [urlStatus, setUrlStatus] = useState<
    "checking" | "available" | "exists" | null
  >(null);
  // const [validationError, setValidationError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // const validateRouteName = (input: string): boolean => {
  //   const forbiddenChars = /[\/\\?#@$%^&*+=|<>{}[\],;:!]/;
  //   const startsWithNumber = /^\d/;
  //   const reservedWords = /^(admin|api|auth|dashboard|profile|settings)/i;

  //   if (forbiddenChars.test(input)) {
  //     setValidationError(
  //       "Cannot contain special characters like /, \\, ?, #, etc."
  //     );
  //     return false;
  //   }
  //   if (startsWithNumber.test(input)) {
  //     setValidationError("Cannot start with a number");
  //     return false;
  //   }
  //   if (reservedWords.test(input)) {
  //     setValidationError("This route name is reserved");
  //     return false;
  //   }
  //   if (input.length < 3) {
  //     setValidationError("Must be at least 3 characters");
  //     return false;
  //   }
  //   if (input.length > 30) {
  //     setValidationError("Must be less than 30 characters");
  //     return false;
  //   }
  //   if (!/^[a-z0-9-]+$/i.test(input)) {
  //     setValidationError("Only letters, numbers, and hyphens allowed");
  //     return false;
  //   }

  //   setValidationError(null);
  //   return true;
  // };

  // if (!restaurant) {
  //   return null;
  // }

  function debounce<Func extends (...args: Parameters<Func>) => void>(
    func: Func,
    wait: number
  ) {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<Func>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const debouncedCheckBusinessUrl = useRef(
    debounce(async (value: string) => {
      setUrlStatus("checking");

      try {
        const response = await checkIfUrlExistsAPI(value);
        setUrlStatus(response.exists ? "exists" : "available");
      } catch {
        setUrlStatus(null);
      }
    }, 500)
  ).current;

  if (!restaurant) {
    return null;
  }

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setEditedRestaurant((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Real-time character validation
    if (name === "businessUrl") {
      const cleanedValue = value.replace(/\s+/g, "-").toLowerCase();
      const invalidChars = /[\/\\?#@$%^&*+=|<>{}[\],;:!]/;

      // Prevent invalid characters from being entered
      if (invalidChars.test(cleanedValue)) {
        // setValidationError(
        //   `Cannot use "${cleanedValue.match(invalidChars)?.[0]}" character`
        // );
        return; // Stop further processing
      }

      // Update state only if valid
      setEditedRestaurant((prev) => ({
        ...prev,
        [name]: cleanedValue.toLowerCase(), // Auto-lowercase
      }));

      // Continue with availability check
      if (cleanedValue.trim() === "") {
        setUrlStatus(null);
        // setValidationError(null);
      } else if (cleanedValue !== restaurant.businessUrl) {
        debouncedCheckBusinessUrl(cleanedValue);
      }
    } else {
      // Normal field handling
      setEditedRestaurant((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    // onUpdate(editedRestaurant);
    setIsLoading(true);
    try {
      const updatedRestaurant = {
        restaurantName: editedRestaurant.restaurantName,
        businessUrl: editedRestaurant.businessUrl,
      };

      await updateRestaurantDetailsAPI(updatedRestaurant, editedRestaurant._id);
    } catch (error) {
      console.error("Error updating restaurant:", error);
      // setError("Failed to update restaurant details. Please try again.");
    } finally {
      setIsLoading(false);
      // setError("");
      window.location.reload();
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    // if (window.confirm("Are you sure you want to delete this restaurant?")) {
    //   onDelete(restaurant._id);
    //   onClose();
    // }
    try {
      await dispatch(deleteUserRestaurantThunk(restaurant._id)).unwrap();
      onClose();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      // setError("Failed to delete restaurant. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">
            {isEditing ? "Edit Restaurant" : "Restaurant Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="restaurantName"
                value={editedRestaurant?.restaurantName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="p-2 bg-gray-50 rounded">
                {restaurant?.restaurantName || "restaurant name not provided"}
              </p>
            )}
          </div>

          {/* Business URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business URL
            </label>
            {isEditing ? (
              <div>
                {" "}
                <input
                  type="text"
                  name="businessUrl"
                  value={editedRestaurant?.businessUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com"
                />
                {isEditing && urlStatus && (
                  <p
                    className={`mt-1 text-sm ${
                      urlStatus === "available"
                        ? "text-green-600"
                        : urlStatus === "exists"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {urlStatus === "checking" && "Checking URL..."}
                    {urlStatus === "available" && "✅ URL is available"}
                    {urlStatus === "exists" && "❌ URL is already taken"}
                  </p>
                )}
              </div>
            ) : (
              <p className="p-2 bg-gray-50 rounded">
                {editedRestaurant?.businessUrl || "not provided"}
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between border-t p-4">
          <div className="space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedRestaurant({ ...restaurant });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                {/* <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Save Changes
                </button> */}
                <button
                  onClick={handleSave}
                  disabled={urlStatus === "exists"}
                  className={`px-4 py-2 rounded text-white focus:outline-none focus:ring-2 ${
                    urlStatus === "exists"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                  }`}
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
          <button
            onClick={() => {
              setDeleteConformationModal(true);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white">Loading...</div>
        </div>
      )}

      {deleteConformationModal && (
        <ConformationModal
          isOpen={deleteConformationModal}
          onClose={() => {
            setDeleteConformationModal(false);
          }}
          onConfirm={handleDelete}
          actionName={`Restaurant, ${restaurant.restaurantName}`}
        />
      )}
    </div>
  );
};

export default RestaurantDetailsModal;
