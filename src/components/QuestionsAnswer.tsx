import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { sendEmailSupportAPI } from "@/res/api";
import MessageDeliveredModal from "./MessageDeliveredModal";

const QuestionsAnswer = () => {
  const QuestionsAnswer = useTranslations("Q&A");
  const Contact = useTranslations("Contact");
  const ContactForm = useTranslations("ContactForm");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const questionsData = [
    {
      question: QuestionsAnswer("q1"),
      answer: QuestionsAnswer("a1"),
    },
    {
      question: QuestionsAnswer("q2"),
      answer: QuestionsAnswer("a2"),
    },
    {
      question: QuestionsAnswer("q3"),
      answer: QuestionsAnswer("a3"),
    },
    {
      question: QuestionsAnswer("q4"),
      answer: QuestionsAnswer("a4"),
    },
    {
      question: QuestionsAnswer("q5"),
      answer: QuestionsAnswer("a5"),
    },
    {
      question: QuestionsAnswer("q6"),
      answer: QuestionsAnswer("a6"),
    },
    {
      question: QuestionsAnswer("q7"),
      answer: QuestionsAnswer("a7"),
    },
    {
      question: QuestionsAnswer("q8"),
      answer: QuestionsAnswer("a8"),
    },
    {
      question: QuestionsAnswer("q9"),
      answer: QuestionsAnswer("a9"),
    },
    {
      question: QuestionsAnswer("q10"),
      answer: QuestionsAnswer("a10"),
    },
    {
      question: QuestionsAnswer("q11"),
      answer: QuestionsAnswer("a11"),
    },
    {
      question: QuestionsAnswer("q12"),
      answer: QuestionsAnswer("a12"),
    },
    {
      question: QuestionsAnswer("q13"),
      answer: QuestionsAnswer("a13"),
    },
    {
      question: QuestionsAnswer("q14"),
      answer: QuestionsAnswer("a14"),
    },
    {
      question: QuestionsAnswer("q15"),
      answer: QuestionsAnswer("a15"),
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !contactFormData.name ||
      !contactFormData.email ||
      !contactFormData.message
    ) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const submitEmail = await sendEmailSupportAPI({
        email: contactFormData.email,
        name: contactFormData.name,
        message: contactFormData.message,
      });

      if (submitEmail.success) {
        setEmailSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return;
    } finally {
      setContactFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="mt-16" id="q&a">
      {/* Q&A Title Section */}
      <div className="px-6 max-w-4xl mx-auto text-center mb-16">
        <h3 className="text-4xl font-bold text-custom-navy-1 mb-6 md:text-5xl lg:text-5xl">
          {QuestionsAnswer("title")
            .split(/(asked|about|service)/gi)
            .map((word, index) =>
              ["asked", "about", "service"].includes(word.toLowerCase()) ? (
                <span key={index} className="text-custom-red-1">
                  {word}
                </span>
              ) : (
                word
              )
            )}
        </h3>
        <div className="w-24 h-1 bg-custom-red-1 mx-auto mt-4"></div>
      </div>

      {/* Q&A List */}
      <div className="px-4 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <ol className="space-y-4">
            {questionsData.map((data, index) => (
              <li
                key={index}
                className={`p-5 rounded-2xl transition-all duration-200 ${
                  openIndex === index
                    ? "bg-custom-navy-1/5 border border-custom-navy-1/20"
                    : "bg-custom-grey-1 hover:bg-custom-grey-1/80"
                }`}
              >
                <div
                  onClick={() => toggleAnswer(index)}
                  className="cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-lg font-semibold ${
                        openIndex === index
                          ? "text-custom-navy-1"
                          : "text-custom-navy-1"
                      } md:text-xl`}
                    >
                      {data.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`text-2xl font-bold ${
                        openIndex === index
                          ? "text-custom-red-1"
                          : "text-custom-navy-1"
                      }`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  </div>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-custom-navy-2 mt-4 pl-2 text-base md:text-lg">
                    {data.answer}
                  </p>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Contact */}
      <form
        onSubmit={handleContactFormSubmit}
        className="bg-custom-red-1 p-5 mt-10 flex flex-col gap-8 md:gap-10 xl:flex-row xl:items-center xl:justify-around xl:gap-16 xl:p-16"
      >
        <div className="xl:flex xl:flex-col xl:gap-16">
          <div>
            <h3 className="text-2xl text-center font-bold text-custom-white-1 md:text-4xl lg:text-5xl xl:text-4xl md:mb-5">
              {Contact("title")}
            </h3>
            <p className="text-center text-custom-white-1 text-lg md:text-2xl lg:text-3xl xl:text-xl xl:w-[35rem] m-auto xl:mt-8">
              {Contact("content")}
            </p>
          </div>

          {/* XL screen size contact information */}
          <div className="hidden xl:block bg-custom-white-1 p-2 rounded-3xl w-[35rem] m-auto">
            <h3 className="text-center text-3xl text-custom-navy-1 mt-5 font-bold md:text-4xl lg:text-5xl xl:text-2xl">
              {Contact("contactTitle")}
            </h3>
            <p className="text-custom-black2 font-thin text-center md:text-2xl lg:text-3xl xl:text-lg xl:leading-loose xl:px-8">
              {Contact("contactMessage")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full xl:w-[30rem] xl:bg-custom-white-1 xl:p-7 xl:rounded-[2.2rem] xl:gap-10">
          <input
            type="text"
            name="name"
            value={contactFormData.name}
            onChange={handleInputChange}
            className="w-full p-4 rounded-full text-lg outline-custom-red-2 md:p-6 md:text-xl lg:text-3xl lg:p-8 xl:p-4 xl:text-lg xl:bg-custom-gey-1 xl:outline-none text-custom-black2"
            placeholder={ContactForm("name")}
          />
          <input
            type="text"
            name="email"
            value={contactFormData.email}
            onChange={handleInputChange}
            className="w-full p-4 rounded-full text-lg outline-custom-red-2 md:p-6 md:text-xl lg:text-3xl lg:p-8 xl:p-3 xl:text-lg xl:bg-custom-gey-1 xl:outline-none text-custom-black2"
            placeholder={ContactForm("email")}
          />
          <textarea
            name="message"
            value={contactFormData.message}
            onChange={handleInputChange}
            className="w-full rounded-2xl  min-h-[12rem] resize-y p-5 text-lg outline-custom-red-2 md:text-xl md:rounded-3xl lg:text-3xl lg:p-8 lg:min-h-[18rem] xl:p-3 xl:text-lg xl:bg-custom-gey-1 xl:min-h-[10rem] xl:outline-none text-custom-black2"
            placeholder={ContactForm("textArea")}
          ></textarea>
          <button className="bg-custom-white-1 text-custom-red-1 p-4 w-full rounded-full md:p-6 md:text-xl lg:p-8 lg:text-3xl xl:p-3 xl:text-xl xl:bg-custom-red-1 xl:text-custom-white-1 xl:hover:bg-custom-red-2">
            {Contact("submit")}
          </button>
        </div>

        <div className="xl:hidden">
          <h3 className="text-center text-3xl text-custom-white-1 mt-5 font-bold md:text-4xl lg:text-5xl">
            {Contact("contactTitle")}
          </h3>
          <p className="text-custom-white-1 font-thin text-center md:text-2xl lg:text-3xl lg:mb-12">
            {Contact("contactMessage")}
          </p>
        </div>
      </form>

      {emailSubmitted && (
        <MessageDeliveredModal onClose={() => setEmailSubmitted(false)} />
      )}
    </div>
  );
};

export default QuestionsAnswer;
