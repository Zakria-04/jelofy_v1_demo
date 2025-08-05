import React, { useState } from "react";
import { CloseIcon } from "@/utils/icons/CloseIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";

interface MobileMenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; id: string }[];
  languages: { label: string; code: string }[];
  currentLanguage: string | undefined;
  onLanguageChange: (language: string) => void;
  handleNavClick: (label: string, id: string) => void;
  startTransition: (callback: () => void) => void;
}

const Divider = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    exit={{ scaleX: 0 }}
    transition={{ duration: 0.3 }}
    className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-4"
  />
);

const MobileMenu = ({
  isMenuOpen,
  onClose,
  navLinks,
  languages,
  currentLanguage,
  onLanguageChange,
  handleNavClick,
  startTransition,
}: MobileMenuProps) => {
  const JelofyServices = useTranslations("Service");
  const NavTabs = useTranslations("NavTabs");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const router = useRouter();

  const handleServiceClick = () => {
    setIsServiceDropdownOpen((prev) => !prev);
  };

  if (!isMenuOpen) return null;

  const changeLocale = (newLocale: string) => {
    Cookies.set("JELOFY_LOCALE", newLocale, { expires: 365 });
    router.refresh();
  };

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

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-gradient-to-b from-custom-red-1 to-custom-red-2 z-50 flex flex-col backdrop-blur-sm"
    >
      {/* Header with Close Button */}
      <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-custom-red-1/80 backdrop-blur-sm">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-xl font-bold"
        >
          Menu
        </motion.h2>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 transition-all hover:bg-white/10 rounded-full size-16"
        >
          <CloseIcon color="white" />
        </motion.button>
      </div>

      <Divider />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-6">
          {/* Navigation Links */}
          {navLinks.map((link, index) => (
            <div key={index} className="mb-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <button
                  className="flex items-center justify-between w-full py-4 group"
                  onClick={() => {
                    if (link.label === NavTabs("service")) {
                      handleServiceClick();
                    } else {
                      handleNavClick(link.label, link.id);
                      onClose();
                    }
                  }}
                >
                  <span className="text-white text-xl font-medium group-hover:text-white/90 transition-colors">
                    {link.label}
                  </span>
                  {link.label === NavTabs("service") && (
                    <motion.span
                      animate={{ rotate: isServiceDropdownOpen ? 180 : 0 }}
                      className="text-white text-xl ml-2 transition-transform"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                  )}
                </button>

                {/* Service Dropdown */}
                {link.label === NavTabs("service") && (
                  <AnimatePresence>
                    {isServiceDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-4 mt-2 space-y-6 overflow-hidden"
                      >
                        {service.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                            className="border-l-2 border-white/20 pl-4 py-2"
                          >
                            <h3 className="text-white text-lg font-medium">
                              {item.title}
                            </h3>
                            <p className="text-white/80 text-sm mt-1 mb-3">
                              {item.description}
                            </p>
                            <Link href={item.href}>
                              <button
                                className="bg-white/90 text-custom-red-1 px-5 py-1.5 rounded-full font-medium text-sm hover:bg-white transition-all hover:shadow-sm"
                                onClick={onClose}
                              >
                                {JelofyServices("jelofyServiceBtn")}
                              </button>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + navLinks.length * 0.05 }}
            className="mt-2"
          >
            <Link href={"/auth/manager"}>
              <button className="text-white text-xl font-medium py-4 hover:text-white/90 transition-colors">
                {JelofyServices("managerLogin")}
              </button>
            </Link>
          </motion.div>
        </div>
        
        <Divider />
        
        {/* Language Selector */}
        <div className="px-6 py-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              className="flex items-center justify-between w-full py-4 group"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              aria-expanded={isLanguageOpen}
            >
              <span className="text-white text-xl font-medium group-hover:text-white/90 transition-colors">
                {JelofyServices("language")}
              </span>
              <motion.span
                animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                className="text-white text-xl transition-transform"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </button>

            {/* Language Dropdown */}
            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-3 mt-2 pl-4"
                >
                  {languages.map((language, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onClick={() => {
                        onLanguageChange(language.label);
                        changeLocale(language.code);
                        startTransition(() => {
                          router.refresh();
                        });
                      }}
                      className={`text-left py-2 px-4 rounded-lg transition-all ${
                        currentLanguage === language.label
                          ? "bg-white text-custom-red-1 font-medium"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                      aria-label={`Change language to ${language.label}`}
                    >
                      {language.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Footer Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="sticky bottom-0 bg-gradient-to-t from-custom-red-1 to-transparent pt-8 pb-6 px-6"
      >
        <div className="flex flex-col gap-3 max-w-md mx-auto">
          <Link
            href="/auth?view=login"
            className="w-full bg-white/10 text-white py-3 px-6 rounded-full text-center font-medium hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
          >
            {NavTabs("logBtn")}
          </Link>
          <Link
            href="/auth?view=signup"
            className="w-full bg-white text-custom-red-1 py-3 px-6 rounded-full text-center font-medium hover:bg-gray-100 transition-all shadow-sm hover:shadow-md"
          >
            {NavTabs("register")}
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;