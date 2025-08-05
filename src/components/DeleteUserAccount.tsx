import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { deleteUserAccountThunk } from "@/store/user/userThunks";
import { useAppSelector } from "@/store/store/storeSelectors";

interface DeleteUserAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteUserAccount = ({}: DeleteUserAccountProps) => {
  const [password, setPassword] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleDeleteAccount = async () => {
    if (!password) {
      setError("Please enter your password to confirm");
      return;
    }

    setIsDeleting(true);
    try {
      const deleteAccount = await dispatch(
        deleteUserAccountThunk({ password })
      ).unwrap();
      //   router.push("/goodbye");
      router.push("/");
      return deleteAccount;
    } catch (err) {
      setError(
        (err as string) ||
          "Failed to delete account. Please check your password."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className=" mt-6 mx-auto p-6 bg-white rounded-lg shadow-md border border-red-100">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-red-100 rounded-full mr-3">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Delete Your Account
        </h2>
      </div>

      <p className="text-gray-600 mb-6">
        This action cannot be undone. All your data will be removed from our
        systems.
      </p>

      {!isConfirming ? (
        <button
          onClick={() => setIsConfirming(true)}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-150"
        >
          Delete My Account
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type={user.user?.authProvider === "google" ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
              placeholder={
                user.user?.authProvider === "google"
                  ? `Type "Delete My Account" to confirm`
                  : "Enter your current password to confirm account deletion"
              }
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                setIsConfirming(false);
                setPassword("");
                setError("");
              }}
              className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition duration-150"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-150 disabled:opacity-70"
              disabled={
                isDeleting || !password || user.user?.authProvider === "google"
                  ? password !== "Delete My Account"
                  : false
              }
            >
              {isDeleting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  Deleting...
                </span>
              ) : (
                "Confirm Deletion"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUserAccount;
