import Images from "@/assets/images/Images";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Service = () => {
  const Service = useTranslations("Service");

  const serviceImgs = [
    {
      id: 1,
      img: Images.restaurant,
      alt: "restaurant",
      content: Service("service1"),
    },
    {
      id: 2,
      img: Images.qr_scan,
      alt: "qr_scan",
      content: Service("service2"),
    },
    {
      id: 3,
      img: Images.website_build_2,
      alt: "",
      content: Service("service3"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center md:mt-5">
      <h2 className="text-lg font-bold text-custom-navy-1 mb-3 text-center md:text-3xl lg:text-[2.5rem] lg:leading-tight lg:w-[50rem] mt-14">
        {Service("l1")}
      </h2>
      <p className="text-[.8rem] text-custom-navy-1 font-thin mb-10 md:text-xl">
        {Service("l2")}
      </p>

      {/* Content */}
      <div className="lg:flex md:mt-8 ">
        <Image
          src={Images.website_build}
          alt="Website-build"
          width={250}
          height={250}
          className="md:float-start lg:w-[25rem]"
          priority
        />
        <div>
          <h3 className="text-xl font-bold text-custom-navy-1 mb-2 md:text-3xl md:mb-8 text-center lg:text-left">
            {Service("customize")}
          </h3>

          <p className="text-sm leading-6 text-custom-navy-1 font-thin mb-5 md:text-lg md:leading-9 md:px-3 text-center w-full px-5 lg:w-[40rem] xl:w-[50rem] lg:text-left">
            {Service("customizeParagraph")}
          </p>
        </div>
      </div>

      {/* Service Offers */}
      <div className="text-center mt-10">
        <h3 className="text-custom-navy-1 font-bold md:text-3xl lg:text-4xl lg:w-[50rem] m-auto">
          {Service("l3")}
        </h3>

        <div className="lg:flex lg:justify-center lg:items-center lg:mt-10">
          {serviceImgs.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col items-center mt-8 md:mt-14"
            >
              <Image
                src={service.img}
                alt={service.alt}
                width={300}
                height={300}
                className={`bg-cover w-[14rem] md:w-[20rem] ${
                  index === 1 ? "rounded-full w-[8rem] md:w-[13rem]" : ""
                }`}
                priority
              />
              <p className="text-sm mt-5 md:text-2xl md:px-10 md:mt-10 text-custom-black2">
                {service.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8 rounded-3xl shadow">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {Service("l4")}
            <span className="block sm:inline"> {Service("l5")}</span>
          </h1>

          <div className="mt-8 relative max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl text-gray-800 font-medium">
              {Service("l6")}{" "}
              <span className="line-through text-gray-500">$1000+</span>{" "}
              {Service("l7")}
            </p>
            <div className="mt-4 bg-white inline-flex items-center px-6 py-3 rounded-full shadow-md border border-gray-200">
              <span className="text-3xl font-extrabold text-primary">
                {Service("l8")}
              </span>
              <span className="ml-3 text-lg text-gray-600">
                {Service("l9")}
              </span>
            </div>
          </div>

          <p className="mt-10 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {Service("l10")}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link href={"/auth?view=signup"}>
              <button className="px-8 py-4 bg-custom-red-4 hover:bg-primary-dark text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
                {Service("l11")}
              </button>
            </Link>
            {/* <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-lg border border-gray-300 shadow-sm transition-all duration-200">
              See How It Works
            </button> */}
          </div>

          <div className="mt-10 flex justify-center items-center text-sm text-gray-500">
            <svg
              className="w-5 h-5 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {Service("l12")}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 mt-12 max-w-6xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-2xl">
        <Image
          src="https://res.cloudinary.com/dvvm7u4dh/image/upload/v1753528574/My_First_Restaurant_QRCode_szeh1a.png"
          alt="Generated QR Code"
          className="w-52 h-52 md:w-64 md:h-64 rounded-xl border border-gray-200 shadow"
          width={256}
          height={256}
          priority
          draggable={false}
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            🎉 {Service("t1")}
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-3">
            {Service("t2")}
          </p>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            {Service("t3")}
          </p>
          <a
            href="/menu/goldenella"
            target="_blank"
            className="inline-block bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            {Service("t4")}
          </a>
        </div>
      </div>

      {/* services images */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Feature 1 */}
          <div className="space-y-6 order-1">{/* Content if needed */}</div>
          <div className="order-2 rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <Image
              src={Images.Velora}
              alt="Editor interface showing menu customization options"
              className="w-full h-auto"
              width={800} // Add appropriate dimensions
              height={600}
              priority
            />
          </div>

          {/* Feature 2 */}
          <div className="space-y-6 order-1">{/* Content if needed */}</div>
          <div className="order-2 rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <Image
              src="https://res.cloudinary.com/dfwjujk7m/image/upload/v1750615862/Velora_yawv1l.png"
              alt="Editor interface showing menu customization options"
              className="w-full h-auto"
              width={800} // Match dimensions with first image
              height={600}
              priority
            />
          </div>

          {/* Feature 3 */}
          <div className="space-y-6 order-2">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {Service("i1")}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {Service("i2")}
            </p>
          </div>
          <div className="order-2 rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <Image
              src={Images.editor_page}
              alt="Editor interface showing menu customization options"
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Feature 4 */}
          <div className="order-4 md:order-3 rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <Image
              src={Images.dashboard_page}
              alt="Dashboard with analytics and performance metrics"
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="space-y-6 order-3 md:order-4">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {Service("i3")}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {Service("i4")}
            </p>
          </div>

          {/* Feature 5 */}
          <div className="space-y-6 order-5">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {Service("i5")}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {Service("i6")}
            </p>
          </div>
          <div className="order-6 rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <Image
              src={Images.meal_manager}
              alt="Meal management interface showing food items"
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Feature 6 */}
          <div className="order-8 md:order-7 rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <Image
              src={Images.team_access_page}
              alt="Team management interface showing staff permissions"
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="space-y-6 order-7 md:order-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {Service("i7")}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {Service("i8")}
            </p>
          </div>

          {/* Feature 7 */}
          <div className="space-y-6 order-9">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {Service("i9")}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {Service("i10")}
            </p>
          </div>
          <div className="order-10 rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <Image
              src={Images.translation_page}
              alt="Language translation interface showing menu in multiple languages"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* QR_CODE Trail section */}
      <div className="mt-16 bg-custom-red-1 flex flex-col items-center p-5 text-center gap-8 w-full lg:flex-row lg:justify-center lg:p-16">
        <div className="">
          <h3 className="text-custom-white-1 font-semibold text-lg md:text-3xl md:px-20 mb-5 lg:text-4xl lg:w-[50rem]">
            {Service("qrCodeL1")}
          </h3>
          {/* small screen image */}
          <Image
            src={Images.qr_example}
            alt="qr_example"
            width={200}
            height={200}
            className="md:w-[18rem] lg:hidden m-auto"
            priority
          />
          <button
            onClick={() => {
              window.open("https://www.jelofy.com/demo/SimpleBites", "_blank");
            }}
            className="bg-custom-white-1 text-custom-red-1 p-3 rounded-full px-10 mt-7 md:p-5 md:w-[35rem] md:text-xl md:font-semibold "
          >
            {Service("qrCodeL2")}
          </button>
        </div>
        {/* big screen image */}
        <Image
          src={Images.qr_example}
          alt="qr_example"
          width={200}
          height={200}
          className="md:w-[18rem] hidden lg:block"
          priority
        />
      </div>
    </div>
  );
};

export default Service;
