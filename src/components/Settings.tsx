// import React from "react";

// const Settings = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//         {/* Header */}
//         <div className="bg-blue-600 p-6">
//           <h1 className="text-2xl font-bold text-white">Settings</h1>
//           <p className="text-blue-100 mt-1">Manage your account preferences</p>
//         </div>

//         {/* Settings Options */}
//         <div className="divide-y divide-gray-200">
//           {/* Profile Section */}
//           <div className="p-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">
//               Profile Settings
//             </h2>
//             <div className="space-y-4">
//               <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center">
//                   <div className="bg-blue-100 p-2 rounded-full mr-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-blue-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-gray-700">
//                     Update Profile Information
//                   </span>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>

//               <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center">
//                   <div className="bg-green-100 p-2 rounded-full mr-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-green-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-gray-700">Change Language</span>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Account Section */}
//           <div className="p-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">
//               Account Settings
//             </h2>
//             <div className="space-y-4">
//               <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center">
//                   <div className="bg-purple-100 p-2 rounded-full mr-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-purple-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-gray-700">Payment Methods</span>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>

//               <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center">
//                   <div className="bg-yellow-100 p-2 rounded-full mr-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-yellow-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-gray-700">Cancel Subscription</span>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Privacy & Security */}
//           <div className="p-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">
//               Privacy & Security
//             </h2>
//             <div className="space-y-4">
//               <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center">
//                   <div className="bg-red-100 p-2 rounded-full mr-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-red-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-gray-700">Change Password</span>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>

//               <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center">
//                   <div className="bg-gray-100 p-2 rounded-full mr-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-gray-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-gray-700">Delete Account</span>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Notifications Section */}
//           <div className="p-6">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">
//               Notifications
//             </h2>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-3">
//                 <span className="text-gray-700">Email Notifications</span>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     defaultChecked
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>
//               <div className="flex items-center justify-between p-3">
//                 <span className="text-gray-700">Push Notifications</span>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     defaultChecked
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

import { languages } from "@/res/data";
import { useTranslations } from "next-intl";
import React, { useState, useTransition } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import UpdateProfileModal from "./UpdateProfileModal";
import UpdateUserPasswordModal from "./UpdateUserPasswordModal";
import DeleteUserAccount from "./DeleteUserAccount";
import Link from "next/link";

const Settings = () => {
  const router = useRouter();
  const Settings = useTranslations("Settings");
  const [activeTab, setActiveTab] = useState("profile");
  const [isPending, startTransition] = useTransition();
  const [locale, setLocale] = useState(cookies.get("JELOFY_LOCALE") || "en");
  const [modalsOpen, setModalsOpen] = useState({
    updateProfile: false,
    changePassword: false,
    deleteAccount: false,
  });

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setLocale(newLocale);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 px-2">
          {Settings("title")}
        </h1>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "profile"
                ? "bg-red-100 text-custom-red-4 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {Settings("profileSettings")}
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "account"
                ? "bg-red-100 text-custom-red-4 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {Settings("accountSettings")}
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
              activeTab === "privacy"
                ? "bg-red-100 text-custom-red-4 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {Settings("privacySecurity")}
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-8">
        {/* Profile Settings */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {Settings("profileSettings")}
            </h2>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                {Settings("updateProfile")}
              </h3>
              <p className="text-gray-500 mb-4">
                {Settings("updateProfileInfo")}
              </p>
              <button
                onClick={() => {
                  // setUpdateProfileModalOpen(true);
                  setModalsOpen((prev) => ({
                    ...prev,
                    updateProfile: true,
                  }));
                }}
                className="px-5 py-2.5 text-sm font-medium rounded-lg bg-custom-red-4 text-white hover:bg-custom-red-1 transition"
              >
                {Settings("updateProfileBtn")}
              </button>
              {modalsOpen.updateProfile && (
                <UpdateProfileModal
                  isOpen={modalsOpen.updateProfile}
                  onClose={() => {
                    setModalsOpen((prev) => ({
                      ...prev,
                      updateProfile: false,
                    }));
                  }}
                />
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                {Settings("changeLanguage")}
              </h3>
              <p className="text-gray-500 mb-4">{Settings("selectLanguage")}</p>
              <div className="flex items-center gap-4">
                <select
                  value={locale}
                  onChange={handleLanguageChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-custom-red-4 focus:border-custom-red-1 outline-none"
                >
                  {languages.map((lang) => (
                    <option
                      onChange={() => setLocale(lang.code)}
                      key={lang.code}
                      value={lang.code}
                    >
                      {lang.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    cookies.set("JELOFY_LOCALE", locale, { expires: 365 });
                    startTransition(() => {
                      router.refresh();
                    });
                  }}
                  className="px-5 py-2.5 text-sm font-medium rounded-lg bg-custom-red-4 text-white hover:bg-custom-red-1 transition"
                >
                  {Settings("save")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings */}
        {activeTab === "account" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {Settings("accountSettings")}
            </h2>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                {Settings("paymentMethods")}
              </h3>
              <p className="text-gray-500 mb-4">{Settings("paymentInfo")}</p>
              <Link
                href={
                  "https://customer-portal.paddle.com/cpl_01jx4knjhjwxhzasmyt9z5p05s"
                }
              >
                <button className="px-5 py-2.5 text-sm font-medium rounded-lg bg-custom-red-4 text-white hover:bg-custom-red-1 transition">
                  {Settings("managePaymentMethods")}
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                {Settings("cancelSubscription")}
              </h3>
              <p className="text-gray-500 mb-4">{Settings("cancelInfo")}</p>
              <Link
                href={
                  "https://customer-portal.paddle.com/cpl_01jx4knjhjwxhzasmyt9z5p05s"
                }
              >
                <button className="px-5 py-2.5 text-sm font-medium rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition">
                  {Settings("cancelSubscription")}
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Privacy & Security */}
        {activeTab === "privacy" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {Settings("privacySecurity")}
            </h2>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                {Settings("changePass")}
              </h3>
              <p className="text-gray-500 mb-4">Create a new secure password</p>
              <button
                onClick={() => {
                  setModalsOpen((prev) => ({
                    ...prev,
                    changePassword: true,
                  }));
                }}
                className="px-5 py-2.5 text-sm font-medium rounded-lg bg-custom-red-4 text-white hover:bg-custom-red-1 transition"
              >
                {Settings("changePass")}
              </button>
              {modalsOpen.changePassword && (
                <UpdateUserPasswordModal
                  isOpen={modalsOpen.changePassword}
                  onClose={() => {
                    setModalsOpen((prev) => ({
                      ...prev,
                      changePassword: false,
                    }));
                  }}
                />
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                {Settings("deleteAccount")}
              </h3>
              <p className="text-gray-500 mb-4">
                {Settings("deleteAccountInfo")}
              </p>
              <button
                onClick={() => {
                  setModalsOpen((prev) => ({
                    ...prev,
                    deleteAccount: true,
                  }));
                }}
                className="px-5 py-2.5 text-sm font-medium rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition"
              >
                {Settings("deleteAccount")}
              </button>
            </div>

            {modalsOpen.deleteAccount && (
              <DeleteUserAccount
                isOpen={modalsOpen.deleteAccount}
                onClose={() => {
                  setModalsOpen((prev) => ({
                    ...prev,
                    deleteAccount: false,
                  }));
                }}
              />
            )}
          </div>
        )}
      </div>
      {/* Loading Indicator */}
      {isPending && <LoadingSpinner />}

      {/* Update Profile Modal */}
      {/* {updateProfileModalOpen && (
        <UpdateProfileModal
          isOpen={updateProfileModalOpen}
          onClose={() => setUpdateProfileModalOpen(false)}
          onSave={() => {}}
        />
      )} */}
    </div>
  );
};

export default Settings;
