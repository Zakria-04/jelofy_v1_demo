import { createNewRestaurantAndTemplateAPI } from "@/store/restaurant/restaurantThunk";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { CloseIcon } from "@/utils/icons/CloseIcon";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

interface RestaurantCreationModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Step {
  title: string;
  label: string;
  fields: Array<{
    name: string;
    type: string;
    options?: Array<{ name: string; value: string }>;
    placeholder?: string;
    required?: boolean;
    label?: string;
  }>;
}

const RestaurantCreationModal = ({ onClose }: RestaurantCreationModalProps) => {
  const { purchasedTemplates } = useAppSelector((state) => state.template);
  const { templateLists } = useAppSelector((state) => state.templateStore);
  const { loading } = useAppSelector((state) => state.restaurant);
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    templateId: "",
    name: "",
    // address: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const steps = [
    {
      title: "Choose the Visual Style That Best Matches Your Restaurant",
      label: "Pick a Template",
      fields: [
        {
          name: "templateId",
          type: "select",
          options: templateLists,
          placeholder: "Select a template",
          required: false,
        },
      ],
    },
    {
      title: "Basic Information",
      label: "Restaurant Details",
      fields: [
        {
          name: "name",
          type: "text",
          label: "What is the name of your restaurant?",
          placeholder: "Patty Palace",
          required: false,
        },
        // {
        //   name: "restaurantUrl",
        //   type: "text",
        //   label: "enter restaurant url",
        //   placeholder: "can be adjusted later",
        //   required: false,
        // },
      ],
    },
  ] as Step[];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const createRestaurantResponse = await dispatch(
        // createNewRestaurantAPI({ restaurantName: formData.name })
        createNewRestaurantAndTemplateAPI({
          restaurantName: formData.name,
          templateId: formData.templateId,
        })
      ).unwrap();

      // if (createRestaurantResponse.success) {
      //   // window.location.reload();

      // }

      return createRestaurantResponse;
    } catch (error) {
      console.error("Error creating restaurant:", error);
    } finally {
      setFormData({
        templateId: "",
        name: "",

        // address: "",
      });
      onClose(false);
    }
  };

  const currentStep = steps[step - 1];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        className="w-[22rem] bg-white rounded-lg shadow-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">New Restaurant</h3>
          <button
            type="button"
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-700 size-7"
          >
            <CloseIcon color="grey" />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex mb-2">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center
                    ${
                      step > index + 1
                        ? "bg-gray-200 text-gray-500"
                        : step === index + 1
                        ? "bg-custom-red-4 text-white"
                        : "bg-gray-200"
                    }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-1 ${
                      step > index + 1 ? "bg-gray-200" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-center mb-2">
            {currentStep.title}
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            {currentStep.label}
          </p>

          {currentStep.fields.map((field) => (
            <div key={field.name} className="mb-3">
              {field.type === "select" ? (
                purchasedTemplates?.length === 0 ? (
                  <option className="text-center text-sm text-gray-500">
                    You haven’t purchased any templates yet.
                    <br />
                    <Link
                      href="/dashboard/store"
                      className="text-custom-red-4 font-semibold underline"
                    >
                      Go to Template Store
                    </Link>
                  </option>
                ) : (
                  <select
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] || ""}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="">{field.placeholder}</option>

                    {field.options?.map(
                      (option: { name: string }, index: number) => (
                        <option key={index}>{option.name}</option>
                      )
                    )}
                  </select>
                )
              ) : (
                <div>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData] || ""}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required={field.required}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}

          {step < steps.length ? (
            <button
              type="button"
              className="ml-auto bg-custom-red-4 text-white py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                setStep(step + 1);
              }}
              disabled={!formData.templateId}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              // onSubmit={handleSubmit}
              className="ml-auto bg-custom-red-4 text-white py-2 px-4 rounded hover:bg-custom-red-1"
            >
              Create Restaurant
            </button>
          )}
        </div>
      </form>

      {/* loading  */}
      {loading && <LoadingSpinner />}

      {/* error message */}
    </div>
  );
};

export default RestaurantCreationModal;
