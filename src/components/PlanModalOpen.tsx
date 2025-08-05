import Link from "next/link";
import React from "react";

interface PlanModalOpenProps {
  onClose: () => void;
}

const PlanModalOpen = ({onClose}: PlanModalOpenProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Plan Change Required
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              To switch to the Starter plan, you&apos;ll need to cancel your current
              subscription. Your access will continue until the end of your
              billing period, then automatically downgrade to Starter.
            </p>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 className="font-semibold text-red-800 mb-2">
                How to cancel:
              </h3>
              <ol className="list-decimal list-inside text-red-700 space-y-1">
                <li>
                  Navigate to <span className="font-medium">Settings</span>
                </li>
                <li>
                  Select <span className="font-medium">Account Settings</span>
                </li>
                <li>
                  Click <span className="font-medium">Cancel Subscription</span>
                </li>
              </ol>
              <Link
                href="/dashboard/settings"
                className="mt-3 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-center"
              >
                Go to Settings Now
              </Link>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              We&apos;re sorry to see you go
            </h3>
            <p className="text-gray-600 mb-3">
              Your feedback helps us improve. Please let us know how we can do
              better.
            </p>
            <Link
              href="/dashboard/support"
              className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
            >
              Share your feedback here
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanModalOpen;
