import Images from "@/assets/images/Images";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Content = () => {
  // const t = useTranslations("Content");
  const router = useRouter();

  const Content = useTranslations("Content");
  return (
    <main>
      <div className="p-8 flex flex-col justify-center items-center lg:flex-row lg:justify-around ">
        <div className="">
          <h1 className="text-[1.6rem] font-bold text-custom-navy-1 leading-snug -tracking-tight md:text-5xl md:leading-tight ">
            {Content("l1")}
            <span className="block lg:block" /> {Content("l2")}
            <span className="block" />
            {Content("l3")}
            <span className="text-custom-red-1"> {Content("l4")}</span>
          </h1>
          <button
            onClick={() => {
              router.push("/auth?=signup");
            }}
            className="inline-block bg-custom-red-1 text-custom-white-1 text-sm p-2.5 w-full  rounded-full hover:bg-custom-red-2 mt-10 mb-1 md:p-4 md:text-lg md:mb-3"
          >
            {Content("btn")}
          </button>
          <div className="text-center">
            <code className="text-custom-navy-1 font-thin text-[.75rem] md:text-lg">
              {Content("btnTxt")}
            </code>
          </div>
        </div>
        <Image
          src={Images.qr_code}
          alt="qr-image"
          width={300}
          height={300}
          className="mt-10 md:size-7/12 lg:size-1/4"
          priority
        />
      </div>
    </main>
  );
};

export default Content;
