import React, { SetStateAction } from "react";

interface EditModal {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface EditManagerModalProps {
  isOpen: boolean;
  userName: string;
  // firstName: string;
  // lastName: string;
  password: string;
  editModal: EditModal;
  onClose: () => void;
  setEditModal: React.Dispatch<SetStateAction<EditModal>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
}

const EditManagerModal = ({
  isOpen,
  onClose,
  onSubmit,
  editModal,
  setEditModal,
}: EditManagerModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Manager</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={editModal.userName}
                onChange={(e) =>
                  setEditModal({
                    ...editModal,
                    userName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                manager first name
              </label>
              <input
                type="text"
                id="firstName"
                value={editModal.firstName}
                onChange={(e) =>
                  setEditModal({
                    ...editModal,
                    firstName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                manager last name
              </label>
              <input
                type="text"
                id="lastName"
                value={editModal.lastName}
                onChange={(e) =>
                  setEditModal({
                    ...editModal,
                    lastName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={editModal.password}
                onChange={(e) => {
                  setEditModal({
                    ...editModal,
                    password: e.target.value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-custom-red-4 rounded-md hover:bg-custom-red-1 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditManagerModal;
