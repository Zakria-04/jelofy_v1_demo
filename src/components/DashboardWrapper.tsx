"use client";

import React, { useState, Suspense, lazy, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import SideBar from "@/components/SideBar";
import SideBarHeader from "@/components/SideBarHeader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getCurrentUserNameThunk } from "@/store/user/userThunks";
import LoadingSpinner from "./LoadingSpinner";
import Cookies from "js-cookie";

const MyMenu = lazy(() => import("@/components/MyMenu"));
const Settings = lazy(() => import("@/components/Settings"));
// const MyTemplates = lazy(() => import("@/components/MyTemplates"));
const MyRestaurants = lazy(() => import("./Restaurant"));
// const TemplatesStore = lazy(() => import("./Templates"));
const TeamAccess = lazy(() => import("./TeamAccess"));
const Templates = lazy(() => import("./Templates"));
const Plans = lazy(() => import("./Plans"));
const HelpSupport = lazy(() => import("./HelpSupport"));
const Translations = lazy(() => import("./Translations"));
const Currency = lazy(() => import("./Currency"));

const ROUTES = {
  DASH_HOME: "home",
  DASH_TEAM_ACCESS: "managers",
  DASH_SETTINGS: "settings",
  DASH_TEMPLATES: "templates",
  DASH_RESTAURANT: "my-restaurants",
  DASH_STORE: "store",
  DASH_SUBSCRIPTION_PLANS: "plans",
  DASH_HELP_SUPPORT: "support",
  DASH_TRANSLATIONS: "translations",
  DASH_CURRENCY: "currency",
} as const;

type PageComponentType = React.LazyExoticComponent<React.ComponentType>;
const pageComponents: Record<string, PageComponentType> = {
  [ROUTES.DASH_HOME]: MyMenu,
  [ROUTES.DASH_TEMPLATES]: Templates,
  [ROUTES.DASH_RESTAURANT]: MyRestaurants,
  [ROUTES.DASH_TEAM_ACCESS]: TeamAccess,
  [ROUTES.DASH_SUBSCRIPTION_PLANS]: Plans,
  [ROUTES.DASH_SETTINGS]: Settings,
  [ROUTES.DASH_HELP_SUPPORT]: HelpSupport,
  [ROUTES.DASH_TRANSLATIONS]: Translations,
  [ROUTES.DASH_CURRENCY]: Currency,

  // [ROUTES.DASH_STORE]: TemplatesStore,
};

const DashboardWrapper = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isGoodToGo, setIsGoodToGo] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // const { language, locale } = useAppSelector((state) => state.language);

  const Component = pageComponents[slug];
  const getLocale = Cookies.get("JELOFY_LOCALE");

  const isRTL = getLocale === "ar" || getLocale === "he";

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await dispatch(getCurrentUserNameThunk()).unwrap();

        return user;
      } catch (error: unknown) {
        console.error("Failed to fetch current user:", error);
      } finally {
        setIsGoodToGo(true);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSideBarOpen && // Only if sidebar is open
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSideBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen]);

  return (
    <>
      <SideBarHeader
        list={slug}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      <SideBar
        ref={sidebarRef}
        isSideBarOpen={isSideBarOpen}
        activePage={slug}
        setActivePage={() => {}}
        isRTL={isRTL}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      {isGoodToGo && (
        <div className={`p-3 ${isRTL ? "xl:mr-[20rem] " : "xl:ml-[20rem]"}`}>
          <Suspense fallback={<LoadingSpinner />}>
            {Component ? <Component /> : <div>Page not found</div>}
          </Suspense>
        </div>
      )}
    </>
  );
};

export default DashboardWrapper;
