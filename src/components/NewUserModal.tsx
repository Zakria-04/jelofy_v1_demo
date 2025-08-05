import React, { useState, useRef, useEffect } from "react";

interface Props {
  onSubmit: (userName: string) => void;
  onSkip: () => void;
  loading?: boolean;
}

const NewUserModal: React.FC<Props> = ({ onSubmit, onSkip, loading }) => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError("Please enter a username");
      return;
    }
    if (userName.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    setError("");
    onSubmit(userName.trim());
  };

  //   const createNewRestaurantAndTemplate = async () => {
  //     try {
  //       const restaurant = await dispatch(
  //         createNewRestaurantAndTemplateAPI({
  //           restaurantName: "My First Restaurant",
  //           templateId: "SimpleBites",
  //         })
  //       ).unwrap();
  //     } catch (error) {
  //       console.error("Error creating restaurant and template:", error);
  //     } finally {
  //       setNewUserModal(false);
  //       router.replace("/dashboard/home");
  //     }
  //   };

  return (
    <div className="fixed inset-0 z-[1001] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl overflow-hidden shadow-xl animate-fadeIn">
        <div className="p-1 bg-gradient-to-r from-purple-500 to-indigo-600">
          <div className="bg-white p-8 rounded-t-xl">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-4xl">
                🎉
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Welcome Aboard!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Let&apos;s personalize your experience. Choose a cool username!
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Username
                </label>
                <input
                  ref={inputRef}
                  id="username"
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. cosmic_traveler"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                <p className="mt-1 text-xs text-gray-500">
                  This will be your public identity
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-70"
              >
                {loading ? (
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
                    Setting up your account...
                  </span>
                ) : (
                  "Continue to Dashboard"
                )}
              </button>
            </form>
          </div>

          <div className="px-8 py-6 bg-gradient-to-r from-purple-500 to-indigo-600 bg-opacity-5">
            <button
              onClick={onSkip}
              className="text-sm text-white hover:text-purple-800 transition"
            >
              I&apos;ll do this later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserModal;
