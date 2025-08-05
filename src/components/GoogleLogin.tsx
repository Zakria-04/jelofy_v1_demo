// import { GoogleIcon } from "@/utils/icons/GoogleIcon";
// import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
// import React from "react";
// import cookies from "js-cookie";

// const GoogleLogin = () => {
//   const t = useTranslations("Auth");
//   const router = useRouter();

//   const openGoogleLoginPopup = () => {
//     const width = 600;
//     const height = 600;
//     const left = window.screen.width / 2 - width / 2;
//     const top = window.screen.height / 2 - height / 2;

//     const popup = window.open(
//       "http://localhost:8080/auth/google",
//       "googleLogin",
//       `width=${width},height=${height},top=${top},left=${left}`
//     );

//     if (!popup) {
//       alert("Please allow popups for this site");
//       return;
//     }

//     const messageListener = (event: MessageEvent) => {
//       // Add origin check for security
//       if (event.origin !== "http://localhost:8080") return;

//       if (event.data.type === "AUTH_SUCCESS") {
//         const { accessToken, refreshToken, user } = event.data; // i removed user because next build was failing
//         // const { accessToken, refreshToken, user } = event.data;

//         // Store tokens
//         // cookies.set("accessToken", accessToken, { expires: 1 });
//         // cookies.set("refreshToken", refreshToken, { expires: 7 });

//         // localStorage.setItem("accessToken", accessToken);
//         // localStorage.setItem("refreshToken", refreshToken);

//         // Close popup
//         popup?.close();

//         // Redirect
//         router.push("/dashboard/home");
//       } else if (event.data.type === "AUTH_ERROR") {
//         console.error("Authentication error:", event.data.error);
//         popup?.close();
//         // Show error to user
//       }
//     };

//     window.addEventListener("message", messageListener);

//     // Cleanup
//     const timer = setInterval(() => {
//       if (popup.closed) {
//         clearInterval(timer);
//         window.removeEventListener("message", messageListener);
//       }
//     }, 500);
//   };

//   return (
//     <div className="flex">
//       <GoogleIcon />
//       <button
//         onClick={openGoogleLoginPopup}
//         className="bg-custom-blue-1 text-custom-white-1 p-4 h-12 flex items-center justify-center w-[17rem]"
//       >
//         {t("googleLogin")}
//       </button>
//     </div>
//   );
// };

// export default GoogleLogin;

import { MainDomain } from "@/res/api";
import { GoogleIcon } from "@/utils/icons/GoogleIcon";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const GoogleLogin = () => {
  const AdminAuth = useTranslations("AdminAuth");
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running in Instagram/Facebook/TikTok in-app browser
    const inAppBrowser = /Instagram|FBAN|FBAV|TikTok/i.test(
      navigator.userAgent
    );
    setIsInAppBrowser(inAppBrowser);
    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const handleGoogleRedirect = () => {
    // Redirect the user to the backend's Google OAuth endpoint

    if (isInAppBrowser && isIOS) {
      // No redirect for iOS in-app browsers
      return;
    }

    window.location.href = `${MainDomain}/auth/google`;
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <div className="flex flex-col gap-2">
          {/* Email login suggestion for iOS in-app browsers */}
          {isInAppBrowser && isIOS && (
            <p className="text-center text-yellow-700 bg-yellow-50 p-2 rounded text-sm mb-2">
              {AdminAuth("googleLoginIOSWarning")}
            </p>
          )}

          {/* Google Login Button */}
          <div className="flex">
            <GoogleIcon />
            <button
              onClick={handleGoogleRedirect}
              className={`p-4 h-12 flex items-center justify-center w-[17rem] ${
                isInAppBrowser && isIOS
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-custom-blue-1 text-custom-white-1 hover:bg-blue-600"
              }`}
              disabled={isInAppBrowser && isIOS}
            >
              {AdminAuth("googleLogin")}
              {isInAppBrowser && isIOS && (
                <span className="ml-2 text-xs">
                  ({AdminAuth("notAvailable")})
                </span>
              )}
            </button>
          </div>

          {/* <p className="text-center text-gray-500 mt-4 text-sm">
            {AdminAuth(isLoginMode ? "LoginGoogleMsg" : "SignUpGoogleMsg")}
          </p> */}

          {/* Additional instructions for iOS users */}
          {isInAppBrowser && isIOS && (
            <div className="mt-2 text-center text-sm text-gray-600">
              <p>{AdminAuth("googleLoginIOSInstructions1")}</p>
              <p className="mt-1">
                {AdminAuth("googleLoginIOSInstructions2")}{" "}
                {/* <a
                  href={window.location.href}
                  target="_blank"
                  className="text-blue-500 underline"
                > */}
                {AdminAuth("openInBrowser")}
                {/* </a> */}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;
