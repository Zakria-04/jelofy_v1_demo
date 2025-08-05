import LocationIcon from "@/utils/icons/LocationIcon";
import PhoneIcon_2 from "@/utils/icons/PhoneIcon_2";
import WifiIcon from "@/utils/icons/WifiIcon";
import React from "react";

const ContentHeader = () => {
  return (
    <div className="z-10">
      <h1 className="text-3xl">Jelofy Demo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        <p className="flex items-center gap-2 text-sm">
          {<LocationIcon />} 220 W 42nd St, New York, NY 10036, USA
        </p>

        <p className="flex items-center gap-2 text-sm">
          <PhoneIcon_2 /> <span dir="ltr">+123 456 789</span>
        </p>

        <p className="flex items-center gap-2 text-sm">
          <WifiIcon /> <span dir="ltr">WiFi_Password123</span>
        </p>
      </div>
      <p className="text-sm mt-4">
        Use this section to share helpful details with your guests — such as
        service charges, taxes, opening hours, contact information, delivery
        policies, and your general QR code menu.
      </p>
    </div>
  );
};

export default ContentHeader;
