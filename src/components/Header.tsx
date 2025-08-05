"use client";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import Images from "@/assets/images/Images";
import { languages } from "@/res/data";
import MobileMenu from "./MobileMenu";
import ServiceDropdown from "./ServiceDropdown";
import { logoName } from "@/utils/utils";
import cookies from "js-cookie";
import { useTranslations } from "next-intl";

import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";

const Header = () => {
  const JelofyServices = useTranslations("Service");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const NavTabs = useTranslations("NavTabs");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  // const getCurrentLanguage = () => {
  //   const getCookieLocale = cookies.get("JELOFY_LOCALE");
  //   if (getCookieLocale) {
  //     const foundLanguage = languages.find(
  //       (lang) => lang.code === getCookieLocale
  //     );
  //     return foundLanguage ? foundLanguage.label : languages[0].label;
  //   }
  // };

  // const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());

  // useEffect(() => {
  //   setCurrentLanguage(getCurrentLanguage());
  // }, []);

  const [currentLanguage, setCurrentLanguage] = useState<string>(
    languages[0].label
  );

  useEffect(() => {
    const getCurrentLanguage = () => {
      const getCookieLocale = cookies.get("JELOFY_LOCALE");
      if (getCookieLocale) {
        const foundLanguage = languages.find(
          (lang) => lang.code === getCookieLocale
        );
        return foundLanguage ? foundLanguage.label : languages[0].label;
      }
      return languages[0].label; // Default fallback
    };

    setCurrentLanguage(getCurrentLanguage());
  }, []);

  const navLinks = [
    {
      // label: getNestedTranslation(translations, "NavTabs.service", "Service"),
      label: NavTabs("service"),
      id: "service",
    },
    {
      label: NavTabs("pricing"),
      id: "pricing",
    },
    {
      label: NavTabs("q&a"),
      id: "q&a",
    },
    {
      label: NavTabs("about"),
      id: "about",
    },
  ];

  const service = [
    {
      title: JelofyServices("jelofyService1"),
      description: JelofyServices("jelofyService1Paragraph"),
      href: "/service/qr-menu",
    },
    {
      title: JelofyServices("jelofyService2"),
      description: JelofyServices("jelofyService2Paragraph"),
      href: "/service/payment-orders-process",
    },
  ];

  const handleNavClick = (label: string, id: string) => {
    if (label === NavTabs("service")) {
      setIsServiceDropdownOpen((prev) => !prev);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setIsServiceDropdownOpen(false);
      }
    }
    // if (
    //   label === getNestedTranslation(translations, "NavTabs.service", "Service")
    // ) {
    //   setIsServiceDropdownOpen((prev) => !prev);
    // } else {
    //   const section = document.getElementById(id);
    //   if (section) {
    //     section.scrollIntoView({ behavior: "smooth" });
    //     setIsServiceDropdownOpen(false);
    //   }
    // }
  };

  return (
    <div className="sticky top-0 z-50 bg-custom-white-1 shadow">
      <div className="flex items-center justify-between p-2 md:p-4 lg:p-3">
        {/* Logo + Nav */}
        <div className="flex gap-12 items-center p-3">
          <h1 className="font-bold text-gray-800 first-letter:text-custom-red-1 text-2xl ml-3 xl:text-2xl">
            {logoName}
          </h1>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-8 ">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(label, id)}
                className="text-custom-black2 hover:font-bold flex items-center gap-1"
              >
                {label}
                {label === NavTabs("service") && (
                  <span
                    className={`transform duration-300 text-xl ml-1 ${
                      isServiceDropdownOpen
                        ? "rotate-180 mb-0.5"
                        : "rotate-0 mt-1.5"
                    }`}
                  >
                    ^
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Auth & Buttons */}
        <div className="flex items-center gap-4">
          {/* Auth Section */}
          <div className="hidden lg:flex gap-4 items-center">
            {/* Updated Language Button */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1 text-custom-black2 hover:text-custom-red-1 transition"
              >
                {/* <div className="size-5 flex items-center">
                  <GlobeIcon />
                </div> */}
                <span className="text-sm">{currentLanguage}</span>
                <span
                  className={`transition-transform duration-300 text-sm ${
                    isLanguageOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadeIn">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        currentLanguage === lang.label
                          ? "font-semibold text-custom-red-1"
                          : ""
                      }`}
                      onClick={() => {
                        // document.cookie = `JELOFY_LOCALE=${lang.code}; path=/`;
                        cookies.set("JELOFY_LOCALE", lang.code, {
                          expires: 365,
                        });
                        setCurrentLanguage(lang.label);
                        setIsLanguageOpen(false);
                        startTransition(() => {
                          router.refresh(); // this will trigger isPending = true
                        });
                      }}
                    >
                      {lang.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={"/auth/manager"}
              className="text-custom-black2 hover:text-custom-red-1 transition"
            >
              {NavTabs("managerBtn")}
            </Link>

            <span className="text-2xl font-thin text-custom-black1">|</span>
            <Link
              href={{ pathname: "/auth", query: { view: "login" } }}
              className="underline text-custom-black2 hover:text-custom-red-1 transition"
            >
              {NavTabs("logBtn")}
            </Link>
          </div>

          {/* Get Started */}
          <div className="hidden lg:block">
            <Link
              href={{ pathname: "/auth", query: { view: "signup" } }}
              className="bg-custom-red-1 text-custom-white-1 px-6 py-2 rounded-full hover:bg-custom-red-2 transition"
            >
              {NavTabs("registerBtn")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-6 lg:hidden">
            <Link href="auth?view=login">
              <div className="bg-custom-red-4 text-white p-1.5 px-4 rounded-full">
                {NavTabs("login")}
              </div>
            </Link>
            <button onClick={() => setIsMenuOpen(true)}>
              <Image src={Images.menu} alt="Menu" width={32} height={32} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isServiceDropdownOpen && (
        <ServiceDropdown isOpen={isServiceDropdownOpen} service={service} />
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        languages={languages}
        currentLanguage={currentLanguage}
        onLanguageChange={(lang) => {
          setCurrentLanguage(lang);
          setIsMenuOpen(false);
        }}
        handleNavClick={handleNavClick}
        startTransition={startTransition}
      />

      {/* Loading Indicator */}
      {isPending && <LoadingSpinner />}
    </div>
  );
};

export default Header;
