import React from "react";

interface ConformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionName?: string;
}

const ConformationModal = ({
  isOpen,
  onClose,
  onConfirm,
  actionName,
}: ConformationModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md animate-fade-in">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Delete User</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to remove{" "}
          <span className="font-medium text-black">{actionName || "this user"}</span>? This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-custom-red-1 hover:bg-custom-red-4 text-white transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConformationModal;
