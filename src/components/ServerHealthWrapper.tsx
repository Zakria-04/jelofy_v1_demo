"use client";

// import { checkServerHealthAPI } from "@/res/api";

import { useAppSelector } from "@/store/store/storeSelectors";
import { useEffect } from "react";

import LoadingSpinner from "./LoadingSpinner";

export default function ServerHealthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isServerUp, setIsServerUp] = useState(true);

  // const [locale, setLocale] = useState<string>("");
  // const router = useRouter();

  const { loading } = useAppSelector((state) => state.language);

  // useEffect(() => {
  //   const cookieLocale = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("JELOFY_LOCALE="))
  //     ?.split("=")[1];
  //   if (cookieLocale) {
  //     // setLocale(cookieLocale);
  //   } else {
  //     const browserLocale = navigator.language.slice(0, 2);
  //     // setLocale(browserLocale);
  //     document.cookie = `JELOFY_LOCALE=${browserLocale};`;
  //     router.refresh();
  //     window.location.reload();
  //   }
  // }, [router]);

  // useEffect(() => {
  //   const getSelectedLanguageTranslation = async () => {
  //     try {
  //       const response = await dispatch(getSelectedLanguageTranslationThunk());

  //       return response;
  //     } catch (error) {
  //       console.error("Error fetching translations:", error);
  //     }
  //   };

  //   getSelectedLanguageTranslation();
  // }, [dispatch]);

  // useEffect(() => {
  //   const cookieLocale = document.cookie
  //     .split("; ")
  //     ?.split("=")[1];

  //   if (!cookieLocale) {
  //     const browserLocale = navigator.language.slice(0, 2);
  //     dispatch(setLocale(browserLocale));
  //     // router.refresh();
  //   } else {
  //     setLocaleReady(true);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!localeReady) return;

  //   const getSelectedLanguageTranslation = async () => {
  //     try {
  //       const response = await dispatch(getSelectedLanguageTranslationThunk());
  //       return response;
  //     } catch (error) {
  //       console.error("Error fetching translations:", error);
  //     }
  //   };

  //   getSelectedLanguageTranslation();
  // }, [localeReady, dispatch]);

  // useEffect(() => {
  //   const checkServer = async () => {
  //     try {
  //       const res = await checkServerHealthAPI();
  //       // setIsServerUp(res.live);
  //       return res.live
  //     } catch {
  //       // setIsServerUp(false);
  //     }
  //   };

  //   checkServer();
  //   const interval = setInterval(checkServer, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // if (!isServerUp) {
  //   return (
  //     <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
  //       <h1 className="text-2xl font-semibold text-red-600">Server Error</h1>
  //       <p className="mt-2 text-center text-gray-600">
  //         Our servers are currently unavailable. Please try again later.
  //       </p>
  //       <button
  //         onClick={() => location.reload()}
  //         className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

  return <>{children}</>;
}
