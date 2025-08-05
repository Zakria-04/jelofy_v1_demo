import React from "react";

interface SubscribedModalProps {
  onClose: () => void;
}

const SubscribedModal = ({ onClose }: SubscribedModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-pop-in">
        {/* Confetti elements */}
        <div className="absolute top-0 left-1/4 w-2 h-4 bg-yellow-400 rounded-full animate-confetti-1"></div>
        <div className="absolute top-0 left-1/2 w-3 h-6 bg-pink-500 rounded-full animate-confetti-2"></div>
        <div className="absolute top-0 left-3/4 w-2 h-5 bg-blue-400 rounded-full animate-confetti-3"></div>

        {/* Main content */}
        <div className="p-8 text-center">
          {/* Animated checkmark */}
          <div className="relative mx-auto mb-6">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-emerald-500 animate-checkmark"
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
            <div className="absolute inset-0 border-4 border-emerald-200 rounded-full animate-ring-expand opacity-0"></div>
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-gray-800 mb-3">You&apos;re In!</h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            Thanks for subscribing! We&apos;ve sent a confirmation to your email.
            <span className="block mt-1 font-medium text-emerald-600">
              Welcome to our community!
            </span>
          </p>

          {/* Action button */}
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-full shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
          >
            Awesome, thanks!
          </button>

          {/* Bonus: Newsletter preview */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {/* Next newsletter drops in:
              <span className="font-semibold text-gray-700"> 2 days</span> */}
              talk real soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribedModal;
