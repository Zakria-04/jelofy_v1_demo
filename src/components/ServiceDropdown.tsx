import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ServiceDropdownProps {
  isOpen: boolean;
  service: { title: string; description: string; href: string }[];
}

const ServiceDropdown = ({ isOpen, service }: ServiceDropdownProps) => {
  const JelofyServices = useTranslations("Service");
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -20 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden bg-custom-red-1 text-custom-white-1 p-6 shadow-lg hidden lg:block"
        >
          <div className="flex flex-wrap  gap-6 bg-custom-red-1 text-custom-white-1 p-8 ">
            {service.map((item, index) => (
              <div key={index} className="flex flex-col mb-5 gap-4 w-[30rem]">
                <h3 className="text-[1.4rem] font-bold">{item.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed text-[1rem]">
                  {item.description}
                </p>
                <Link href={item.href}>
                  <button className="bg-custom-white-1 text-custom-red-1 mt-6  flex items-center justify-center gap-3 p-2 w-52 rounded-full font-semibold transition-all duration-200 hover:bg-gray-200">
                    {JelofyServices("jelofyServiceBtn")} 
                    {/* <span className=" text-2xl mb-0.5">→</span> */}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDropdown;
