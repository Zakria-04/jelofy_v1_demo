// import Images from "@/assets/images/Images";
// import { useTranslations } from "next-intl";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const Footer = () => {
//   const t = useTranslations("Footer");
//   return (
//     <div className="bg-custom-navy-1 text-white mt-16">
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 max-w-6xl mx-auto">
//         <div className="flex items-center gap-4">
//           <Image src={Images.logo} alt="online-menu" width={80} height={80} />
//           <h4 className="text-sm">{t("copyright")}</h4>
//         </div>

//         <div>
//           <Link href="/terms" legacyBehavior>
//             <a className="text-sm text-gray-300 hover:text-white underline">
//               Terms of Service
//             </a>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const Footer = useTranslations("Footer");
  return (
    <footer className="bg-gray-100 py-6 mt-12 ">
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-gray-600 text-sm mb-4 sm:mb-0">
          {/* © {new Date().getFullYear()} Jelofy. All rights reserved. */}
          {Footer("copyright", {
            year: new Date().getFullYear(),
          })}

          <div className="mt-1 text-xs text-gray-500">
            Version {process.env.NEXT_PUBLIC_APP_VERSION || "1.0"}
          </div>
        </div>
        <div className="flex items-center gap-9">
          <Link
            href="/terms"
            className="text-gray-600 hover:text-gray-900 text-sm underline transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
