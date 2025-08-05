import { CloseIcon } from "@/utils/icons/CloseIcon";
import React from "react";
// You can use any icon library or SVG

interface SubmitErrorModalProps {
  onClose: () => void;
}

const SubmitErrorModal = ({ onClose }: SubmitErrorModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 size-8"
        >
          <CloseIcon color="gray" />
        </button>

        {/* Error icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error message */}
        <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
          Something went wrong!
        </h3>
        <p className="text-gray-600 text-center mb-6">
          We couldn&apos;t submit your email. Please try again later.
        </p>

        {/* Action button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitErrorModal;
