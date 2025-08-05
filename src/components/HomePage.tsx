"use client";
import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useRouter } from "next/navigation";
import Pricing from "./Pricing";
import QuestionsAnswer from "./QuestionsAnswer";
import About from "./About";
import Footer from "./Footer";
import Cookies from "js-cookie";
// import { MainDomain } from "@/res/api";

const HomePage = () => {
  // const [locale, setLocale] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("JELOFY_LOCALE")) {
      const browserLocale = navigator.language.slice(0, 2) || "en";
      // check if the locale is supported
      if (["en", "ar", "es", "he"].includes(browserLocale)) {
        Cookies.set("JELOFY_LOCALE", browserLocale, { expires: 365 });
      } else {
        Cookies.set("JELOFY_LOCALE", "en", { expires: 365 });
      }
      router.refresh();
    }
  }, [router]);

  return (
    <>
      <Header />
      <Main />
      <Pricing />
      <QuestionsAnswer />
      <About />
      <Footer />
    </>
  );
};

export default HomePage;
