import { createSubscriberAPI } from "@/res/api";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import SubscribedModal from "./SubscribedModal";
import Link from "next/link";

const About = () => {
  const About = useTranslations("About");
  const ContactForm = useTranslations("ContactForm");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const subscribe = await createSubscriberAPI({ email });
      if (subscribe.success) {
        setIsSubscribed(true);
        setError(null);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? JSON.parse(error.message).message ||
              "An error occurred. Please try again."
          : "An unexpected error occurred. Please try again later."
      );
    } finally {
      setEmail("");
    }
  };

  return (
    <div className="" id="about">
      <h1 className="text-2xl text-center font-bold text-custom-navy-1 mt-10 mb-5 md:text-4xl lg:text-6xl xl:text-4xl xl:mt-20">
        {About("title")}
      </h1>
      <p className="text-custom-black2 text-lg font-thin text-center leading-relaxed px-2 md:text-2xl lg:text-4xl lg:leading-loose xl:text-2xl xl:px-[25%] xl:text-left xl:leading-relaxed">
        {About("p1")}
      </p>
      <div className="text-center">
        <Link href={"/auth?=signup"}>
          <button className="bg-custom-red-1 p-4 text-custom-white-1 mt-10 mx-5 rounded-3xl md:rounded-full md:p-5 md:text-xl md:px-12 lg:text-3xl lg:p-8 xl:p-4 xl:text-lg xl:px-32">
            {About("btn")}
          </button>
        </Link>
      </div>

      <hr className="mt-20 mb-20 border-2" />

      {/* Subscription form */}
      <div className="bg-custom-red-1 mt-10 pb-20">
        <h3 className="text-center text-2xl font-bold text-custom-white-1 pt-8 md:text-4xl lg:text-5xl xl:text-4xl">
          {About("aboutFormTitle")}
        </h3>
        <p className="text-center text-custom-white-1 text-lg mt-3 md:text-2xl lg:text-3xl xl:text-xl">
          {About("aboutFormContent")}
        </p>
        <p className="text-custom-white-1 text-sm leading-relaxed mt-5 text-center md:text-lg lg:text-2xl lg:px-20 xl:w-6/12 xl:mx-auto xl:text-base">
          {About("aboutFormParagraph")}
        </p>

        {/* <form
          onSubmit={handleContactSubmit}
          className="flex flex-col items-center gap-5 mt-10 px-2 md:flex-row md:bg-custom-white-1 md:p-6 md:w-11/12 md:mx-auto md:rounded-xl lg:p-8 lg:w-9/12 xl:w-5/12"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-full outline-custom-red-2 text-custom-black2 md:border md:bg-transparent md:rounded-lg lg:p-6 lg:text-2xl xl:p-3 xl:text-lg xl:outline-none"
            placeholder={ContactForm("email")}
          />

          <button className="w-full p-3 bg-custom-white-1 text-custom-red-1 rounded-full md:bg-custom-red-1 md:text-custom-white-1 md:w-1/4 md:rounded-lg lg:p-6 lg:text-2xl lg:w-2/5 xl:p-3 xl:text-lg xl:hover:bg-custom-red-2">
            {About("aboutFormBtn")}
          </button>
          {!error && <p className=" text-sm mt-2">{error}asdasdasd</p>}
        </form> */}
        <form
          onSubmit={handleContactSubmit}
          className=" flex-col items-center gap-5 mt-10 px-2 md:flex-row md:bg-custom-white-1 md:p-6 md:w-11/12 md:mx-auto md:rounded-xl lg:p-8 lg:w-9/12 xl:w-5/12"
        >
          <div className="flex flex-col gap-5 w-full md:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-full outline-custom-red-2 text-custom-black2 md:border md:bg-transparent md:rounded-lg lg:p-6 lg:text-2xl xl:p-3 xl:text-lg xl:outline-none"
              placeholder={ContactForm("email")}
              required
            />

            <button className="w-full p-3 bg-custom-white-1 text-custom-red-1 rounded-full md:bg-custom-red-1 md:text-custom-white-1 md:w-1/4 md:rounded-lg lg:p-6 lg:text-2xl lg:w-2/5 xl:p-3 xl:text-lg xl:hover:bg-custom-red-2">
              {About("aboutFormBtn")}
            </button>
          </div>
          {error && (
            <p className="text-gray-800 md:text-custom-red-1 mt-5 text-center">
              {error}
            </p>
          )}
        </form>
      </div>

      {/* Restaurant templates */}
      <div className="p-10">
        <hr className="mt-20 mb-20 border-2" />
        {/* <div className="ml-20">
          <h4 className="text-3xl text-custom-red-1 font-bold mb-8">{r("title")}</h4>
          {restaurantTemplates.map((template) => (
            <div key={template.id}>
              <h5 className="text-lg hover:text-custom-red-1 w-max cursor-pointer leading-[3rem] duration-200 ">
                {template.title}
              </h5>
            </div>
          ))}
        </div> */}
      </div>

      {isSubscribed && (
        <SubscribedModal onClose={() => setIsSubscribed(false)} />
      )}
    </div>
  );
};

export default About;
