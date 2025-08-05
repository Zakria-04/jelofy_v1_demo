import { sendEmailSupportAPI } from "@/res/api";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import MessageDeliveredModal from "./MessageDeliveredModal";
import SubmitErrorModal from "./SubmitErrorModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getCurrentUserNameThunk } from "@/store/user/userThunks";

const HelpSupport = () => {
  const dispatch = useDispatch<AppDispatch>();
  const HelpSupport = useTranslations("HelpSupport");
  const HelpSupportFAQS = useTranslations("HelpSupportFAQs");
  const [activeTab, setActiveTab] = useState("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await dispatch(getCurrentUserNameThunk()).unwrap();
        if (user) {
          setFormData((prev) => ({
            ...prev,
            name: user.userName || "",
            email: user.email || "",
          }));
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? JSON.parse(error.message).message ||
                "An error occurred. Please try again."
            : "An unexpected error occurred. Please try again later."
        );
        // Optionally, show an error message to the user
      }
    };
    getCurrentUser();
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!formData.message || !formData.email || !formData.name) {
      setError("something went wrong, please try again.");
      return;
    }
    try {
      const sendEmail = await sendEmailSupportAPI(formData);
      if (sendEmail.success) {
        setEmailSubmitted(true);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? JSON.parse(error.message).message ||
              "An error occurred. Please try again."
          : "An unexpected error occurred. Please try again later."
      );
      // Optionally, show an error message to the user
    }
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: HelpSupportFAQS("q1"),
      answer: HelpSupportFAQS("a1"),
    },
    {
      question: HelpSupportFAQS("q2"),
      answer: HelpSupportFAQS("a2"),
    },
    {
      question: HelpSupportFAQS("q3"),
      answer: HelpSupportFAQS("a3"),
    },
    {
      question: HelpSupportFAQS("q4"),
      answer: HelpSupportFAQS("a4"),
    },
    {
      question: HelpSupportFAQS("q5"),
      answer: HelpSupportFAQS("a5"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {HelpSupport("title")}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {HelpSupport("subtitle")}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("contact")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "contact"
                    ? "border-custom-red-1 text-custom-red-4"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {HelpSupport("contactUs")}
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "faq"
                    ? "border-custom-red-1 text-custom-red-4"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {HelpSupport("faqs")}
              </button>
              {/* <button
                onClick={() => setActiveTab('resources')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'resources' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Resources
              </button> */}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "contact" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {HelpSupport("contactForm")}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {HelpSupport("name")}
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-custom-red-4"
                      />
                    </div> */}

                    {/* <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {HelpSupport("email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-custom-red-4"
                      />
                    </div> */}

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {HelpSupport("subject")}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-custom-red-4"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {HelpSupport("message")}*
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-custom-red-4 focus:border-custom-red-1"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-red-4 hover:bg-custom-red-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {HelpSupport("sendBtn")}
                      </button>
                    </div>
                  </form>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {HelpSupport("otherWays")}
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {HelpSupport("emailSupport")}
                        </h3>
                        <p className="mt-1 text-gray-600">
                          jelofyteam@gmail.com
                        </p>
                        <p className="mt-2 text-gray-600">
                          {HelpSupport("responseTime")}
                        </p>
                      </div>
                    </div>

                    {/*//! NOTE!! do not delete the code below it is commented for now but will be used in the future */}
                    {/* <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
                        <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                        <p className="mt-2 text-gray-600">Monday-Friday, 9am-5pm EST</p>
                      </div>
                    </div> */}

                    {/* <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
                        <p className="mt-1 text-gray-600">Available in your dashboard</p>
                        <p className="mt-2 text-gray-600">Monday-Friday, 8am-6pm EST</p>
                        <button>
                          send message via whatsapp
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {HelpSupport("questionTitle")}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none">
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="p-4 bg-white">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* {activeTab === "resources" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Helpful Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                          <svg
                            className="h-6 w-6 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-4 text-lg font-medium text-gray-900">
                          Documentation
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Complete guides and API references for all features.
                      </p>
                      <div className="mt-4">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                          View Documentation →
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                          <svg
                            className="h-6 w-6 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-4 text-lg font-medium text-gray-900">
                          Video Tutorials
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Step-by-step video guides for getting started.
                      </p>
                      <div className="mt-4">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                          Watch Videos →
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                          <svg
                            className="h-6 w-6 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-4 text-lg font-medium text-gray-900">
                          Community Forum
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Connect with other users and share solutions.
                      </p>
                      <div className="mt-4">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                          Join Community →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {emailSubmitted && (
        <MessageDeliveredModal onClose={() => setEmailSubmitted(false)} />
      )}

      {error && <SubmitErrorModal onClose={() => setError(null)} />}
    </div>
  );
};

export default HelpSupport;
