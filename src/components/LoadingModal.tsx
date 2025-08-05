import React from "react";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 z-[1001] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-1 bg-gradient-to-r from-red-600 to-rose-700">
          <div className="bg-white p-8 rounded-t-xl">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-100 to-rose-100 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-200 to-rose-200 flex items-center justify-center">
                    <svg
                      className="animate-spin h-12 w-12 text-rose-600"
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
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-rose-600 rounded-full p-2 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Creating Your Restaurant
              </h2>
              <p className="text-gray-600 text-center mb-6">
                We&apos;re preparing everything you need...
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div
                  className="bg-gradient-to-r from-red-500 to-rose-600 h-2.5 rounded-full animate-pulse"
                  style={{ width: "70%" }}
                ></div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 text-center">
                <p className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Setting up your restaurant profile
                </p>
                <p className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Configuring default templates
                </p>
                <p className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-400 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Finalizing your dashboard
                </p>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-700 bg-opacity-5">
            <p className="text-xs text-center text-white">
              This usually takes less than a minute...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
