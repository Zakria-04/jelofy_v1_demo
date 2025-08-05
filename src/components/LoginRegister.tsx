"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { loginUserAPI, registerUserThunk } from "@/store/user/userThunks";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLogin from "./GoogleLogin";
import Link from "next/link";
import { checkIfUserAlreadyLoggedInAPI, updateUserNameAPI } from "@/res/api";
import NewUserModal from "./NewUserModal";
import { createNewRestaurantAndTemplateAPI } from "@/store/restaurant/restaurantThunk";
import LoadingModal from "./LoadingModal";
import { logoName } from "@/utils/utils";
import { useAppSelector } from "@/store/store/storeSelectors";
import LoadingSpinner from "./LoadingSpinner";

const FloatingInput = ({
  label,
  type,
  value,
  onChange,
  placeHolder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeHolder?: string;
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-red-4 transition-all"
        required
      />
    </div>
  );
};

const AuthForm = () => {
  // const router = useRouter();
  const AdminAuth = useTranslations("AdminAuth");
  const searchParams = useSearchParams();
  const inputsView = searchParams.get("view");
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(inputsView === "login");

  const dispatch = useDispatch<AppDispatch>();
  const [inputs, setInputs] = useState({
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
  });
  const [newUserModal, setNewUserModal] = useState(false);
  const [isGoodToGo, setIsGoodToGo] = useState<boolean>(false);
  const { loading, error } = useAppSelector((state) => state.user);
  const [loginLocked, setLoginLocked] = useState(false);
  const [alreadyLoggedUser, setAlreadyLoggedUser] = useState(false);
  // const [showInstagramWarning, setShowInstagramWarning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Skip if not Instagram browser
    // if (!/Instagram|FBAN|FBAV/i.test(navigator.userAgent)) return;
    if (
      !/Instagram|FBAN|FBAV|Twitter|TikTok|Line|Snapchat|LinkedInApp|Pinterest|WhatsApp/i.test(
        navigator.userAgent
      )
    )
      return;

    // Android: Redirect to Chrome (works)
    if (/Android/i.test(navigator.userAgent)) {
      const currentUrl = window.location.href;
      const cleanUrl = currentUrl
        .replace("https://", "")
        .replace("http://", "");

      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
      return;
    }

    // iOS: Show warning (can't redirect programmatically)
    setShowWarning(true);
  }, []);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const isInstagramBrowser = /Instagram|FBAN|FBAV/i.test(navigator.userAgent);
  //   if (!isInstagramBrowser) return;

  //   // Android redirect
  //   window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;

  //   // iOS warning
  //   setShowInstagramWarning(true);
  // }, []);

  // useEffect(() => {

  //   const checkRefreshToken = async () => {
  //     try {
  //       const res = await axios.post(
  //         `${MainDomain}/user/refresh-token`,
  //         {},
  //         {
  //           withCredentials: true,
  //         }
  //       );

  //       dispatch(
  //         userLoggedIn({
  //           user: res.data.user,
  //           accessToken: res.data.accessToken,
  //           refreshToken: res.data.refreshToken,
  //         })
  //       );

  //       router.push("/dashboard/home");

  //       router.push("/dashboard/home");
  //     } catch (err) {
  //       // Not logged in, stay on login/register page
  //     }
  //   };

  //   checkRefreshToken();
  // }, []);

  useEffect(() => {
    const checkIfUserAlreadyLoggedIn = async () => {
      setLoginLocked(true);
      try {
        const response = await checkIfUserAlreadyLoggedInAPI();
        if (response.success) {
          setAlreadyLoggedUser(true);
          router.replace("/dashboard/home");
        } else {
          setAlreadyLoggedUser(false);
        }
      } catch (error) {
        console.warn("User not logged in or token check failed:", error);
      } finally {
        setLoginLocked(false);
      }
    };

    checkIfUserAlreadyLoggedIn();
  }, [router]);

  const toggleAuthMode = () => {
    setIsLoginMode((prev) => !prev);
    setInputs({
      email: "",
      emailConfirm: "",
      password: "",
      passwordConfirm: "",
    });
  };

  const handleCreateNewRestaurantAndTemplate = async () => {
    try {
      const restaurant = await dispatch(
        createNewRestaurantAndTemplateAPI({
          restaurantName: "My First Restaurant",
          templateId: "SimpleBites",
        })
      ).unwrap();

      return restaurant;
    } catch (error) {
      console.error("Error creating restaurant and template:", error);
    } finally {
      setNewUserModal(false);
      setIsGoodToGo(false);
      router.replace("/dashboard/home");
    }
  };

  const onUserNameSubmit = async (userName: string) => {
    setIsGoodToGo(true);
    try {
      const updateUserName = await updateUserNameAPI({ userName: userName });
      return updateUserName;
    } catch (error) {
      console.error("Error creating restaurant and template:", error);
    } finally {
      setNewUserModal(false);
      handleCreateNewRestaurantAndTemplate();
    }
  };

  const onSkip = async () => {
    setIsGoodToGo(true);
    setNewUserModal(false);
    handleCreateNewRestaurantAndTemplate();
    router.replace("/dashboard/home");
  };

  const handleInputChange = (key: keyof typeof inputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLoginMode) {
        const loginUser = await dispatch(loginUserAPI(inputs)).unwrap();

        if (loginUser.success) {
          router.replace("/dashboard/home");
        }

        // const token = loginUser.accessToken;
        // if (!token) throw new Error("Token not received");

        // await dispatch(getAuthenticatedUserAPI()).unwrap();
        // router.replace("/dashboard/home");
      } else {
        const register = await dispatch(registerUserThunk(inputs))
          .unwrap()
          .then(async (res) => {
            if (res.success) {
              try {
                await dispatch(
                  createNewRestaurantAndTemplateAPI({
                    restaurantName: "My First Restaurant",
                    templateId: "SimpleBites",
                  })
                ).unwrap();
              } catch (error) {
                console.error("Error creating restaurant and template:", error);
              } finally {
                setNewUserModal(true);
              }
            }
          });
        return register;
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* {showInstagramWarning && (
        <div className="instagram-warning">
          ... redirect to a different browser
        </div>
      )} */}

      {showWarning && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-100 p-2 sm:p-3 text-center z-50">
          <div className="max-w-screen-sm mx-auto">
            <p className="text-sm sm:text-base px-1">
              ⚠️ {AdminAuth("googleLoginWarning")}
            </p>

            <div className="flex items-center justify-center my-2">
              <div className="flex bg-white rounded border border-gray-300 items-stretch min-w-0">
                <span className="font-mono px-3 py-1.5 text-sm sm:text-base truncate">
                  jelofy.com
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("jelofy.com");
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                  className="bg-blue-50 text-blue-600 px-3 py-1.5 text-sm sm:text-base border-l border-gray-300 hover:bg-blue-100 active:bg-blue-200 transition-colors"
                >
                  {isCopied ? AdminAuth("copied") : AdminAuth("copy")}
                </button>
              </div>
            </div>

            <p className="text-sm sm:text-base px-1">
              {AdminAuth("googleLoginWarningMsg")}
            </p>
          </div>

          <button
            onClick={() => setShowWarning(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-4xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-yellow-200 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <header className="p-6">
        <Link href="/">
          <h2 className="text-2xl first-letter:text-custom-red-1 text-gray-800 font-bold tracking-wide">
            {logoName}
          </h2>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLoginMode ? "login" : "register"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              {/* Auth Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">
                  {isLoginMode
                    ? AdminAuth("loginView")
                    : AdminAuth("signUpView")}
                </h2>

                <p className="mt-2 text-gray-600">
                  {isLoginMode
                    ? AdminAuth("signUpLink")
                    : AdminAuth("loginLink")}{" "}
                  <button
                    onClick={toggleAuthMode}
                    className="ml-2 text-custom-red-1 font-medium hover:text-custom-red-4 focus:outline-none"
                  >
                    {isLoginMode
                      ? AdminAuth("signUpView")
                      : AdminAuth("loginView")}
                  </button>
                </p>
              </div>

              {/* Form Content */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Email Form - Left */}
                <form
                  onSubmit={handleSubmit}
                  // className="flex-1 border-r-0 md:border-r md:border-gray-200 md:pr-8"
                  className="flex-1 md:pr-8"
                >
                  <FloatingInput
                    label={AdminAuth("email")}
                    placeHolder="e.g. jack@gmail.com"
                    type="email"
                    value={inputs.email}
                    onChange={(value) => handleInputChange("email", value)}
                  />

                  {!isLoginMode && (
                    <FloatingInput
                      label={AdminAuth("emailConfirm")}
                      type="email"
                      value={inputs.emailConfirm}
                      onChange={(value) =>
                        handleInputChange("emailConfirm", value)
                      }
                    />
                  )}

                  <FloatingInput
                    label={
                      isLoginMode
                        ? AdminAuth("LoginPassword")
                        : AdminAuth("signInPassword")
                    }
                    type="password"
                    value={inputs.password}
                    onChange={(value) => handleInputChange("password", value)}
                  />

                  {!isLoginMode && (
                    <FloatingInput
                      label={AdminAuth("signInPasswordConfirm")}
                      type="password"
                      value={inputs.passwordConfirm}
                      onChange={(value) =>
                        handleInputChange("passwordConfirm", value)
                      }
                    />
                  )}

                  {/* error message */}
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loginLocked}
                    className={`w-full bg-custom-red-1 hover:bg-custom-red-4 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-4 ${
                      loginLocked ? "cursor-not-allowed opacity-80" : ""
                    }`}
                    // className="w-full bg-custom-red-1 hover:bg-custom-red-4 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-4"
                  >
                    {isLoginMode
                      ? AdminAuth("loginBtn")
                      : AdminAuth("signUpBtn")}
                  </button>
                </form>

                {/* Divider with OR - Only shows on medium screens and up */}
                <div className="hidden md:flex flex-col items-center justify-center relative">
                  <div className="absolute h-full w-px bg-gray-200"></div>
                  <div className="relative z-10 bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-500">
                    or
                  </div>
                </div>

                {/* Horizontal Divider with OR - Shows on small screens */}
                <div className="flex items-center my-6 md:hidden">
                  <div className="flex-grow h-px bg-gray-200"></div>
                  <div className="px-4 text-gray-500">or</div>
                  <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                {/* Google Login - Right */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-xs">
                    <GoogleLogin />
                    <p className="text-center text-gray-500 mt-4 text-sm">
                      {isLoginMode
                        ? AdminAuth("LoginGoogleMsg")
                        : AdminAuth("SignUpGoogleMsg")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {newUserModal && (
        <NewUserModal
          onSkip={onSkip}
          onSubmit={onUserNameSubmit}
          // createNewRestaurantAndTemplate={createNewRestaurantAndTemplate}
        />
      )}

      {isGoodToGo && <LoadingModal />}

      {alreadyLoggedUser && <LoadingSpinner />}

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default AuthForm;
