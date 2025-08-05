import Images from "@/assets/images/Images";
import { useAppSelector } from "@/store/store/storeSelectors";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface FooterProps {
  headerTemplate: {
    name: string;
    phone: string;
    color: string;
    iconColor: string;
    enabled: boolean;
  };
}

const Footer = ({ headerTemplate }: FooterProps) => {
  const {restaurantName} = useAppSelector((state) => state.store);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // const openPhoneNumber = () => {
  //   const phoneNumber = headerTemplate.phone.replace(/\D/g, ""); // Clean phone number
  //   const url = `https://wa.me/${phoneNumber}`;
  //   window.open(url, "_blank");
  // };

  const callPhoneNumber = () => {
    const phoneNumber = headerTemplate.phone.replace(/\D/g, ""); // Clean phone number
    const url = `tel:${phoneNumber}`;
    window.open(url, "_self");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when at top of page
      if (currentScrollY === 0) {
        setIsAtTop(true);
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      } else {
        setIsAtTop(false);
      }

      // Hide if scrolling down, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!headerTemplate?.enabled) return null;

  return (
    <div>
      <div
        className={`fixed bottom-6 left-6 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${isAtTop ? "!opacity-100" : ""}`}
        style={{
          backgroundColor: headerTemplate?.color,
          zIndex: 1000,
        }}
      >
        <div className="relative group">
          <Image
            src={Images.oldPhone}
            onClick={callPhoneNumber}
            width={42}
            height={42}
            className="size-9 xsm:size-10 cursor-pointer transform group-hover:scale-110 transition-transform"
            alt="Contact us"
            priority
          />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {headerTemplate.name}
          </div>
        </div>
      </div>

      {/* copy right message */}
      <div className="relative ">
        {/* //TODO there is a background color design for the copy right message, all need to be done is to add the option to the UI Config */}
        <div className="mt-auto py-4">
          <p className="text-xs text-center text-white">
            © {new Date().getFullYear()} {restaurantName}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
