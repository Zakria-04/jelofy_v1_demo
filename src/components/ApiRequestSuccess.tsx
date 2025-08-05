import Link from "next/link";
import React from "react";

interface ApiRequestSuccessProps {
  onClose: () => void;
  templateName: string;
}

const ApiRequestSuccess = ({ onClose, templateName }: ApiRequestSuccessProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-pop-in">
        {/* Confetti elements */}
        <div className="absolute top-0 left-1/4 w-2 h-4 bg-blue-400 rounded-full animate-confetti-1"></div>
        <div className="absolute top-0 left-1/2 w-3 h-6 bg-custom-red-4 rounded-full animate-confetti-2"></div>
        <div className="absolute top-0 left-3/4 w-2 h-5 bg-amber-400 rounded-full animate-confetti-3"></div>

        {/* Main content */}
        <div className="p-8 text-center">
          {/* Animated checkmark */}
          <div className="relative mx-auto mb-6">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-500 animate-checkmark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ring-expand opacity-0"></div>
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-gray-800 mb-3">
            Template Added!
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            <span className="font-medium text-blue-600">{templateName}</span>{" "}
            has been added to your collection.
            <span className="block mt-2 text-sm text-gray-500">
              You can now customize and use it in your projects.
            </span>
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-full shadow transition-all"
            >
              Close
            </button>
            <Link
              href={"/dashboard/home"}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-full shadow-lg transition-all transform hover:scale-105"
            >
              Customize Now
            </Link>
          </div>

          {/* Quick tip */}
          {/* <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Pro Tip: Press{" "}
              <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                ⌘+S
              </span>{" "}
              to save your changes
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ApiRequestSuccess;
