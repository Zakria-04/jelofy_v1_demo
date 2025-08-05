// "use client";
// import { selectUser } from "@/store/user/userSelectors";
// import { PlansIcon } from "@/utils/icons/PlansIcon";
// import { TemplatesIcon } from "@/utils/icons/TemplatesIcon";
// import { HelpIcon } from "@/utils/icons/HelpIcon";
// import { SettingsIcon } from "@/utils/icons/SettingsIcon";
// import { MyMenuIcon } from "@/utils/icons/MyMenuIcon";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import React, { Ref } from "react";
// import cookies from "js-cookie";
// import LogoutIcon from "@/utils/icons/LogoutIcon";
// import { logoutUserAPI } from "@/res/api";
// import { AppDispatch } from "@/store/store";
// import { userLoggedOut } from "@/store/actions";
// import { logoName } from "@/utils/utils";
// import TranslateIcon from "@/utils/icons/TranslateIcon";
// import { useTranslations } from "next-intl";
// import RestaurantIcon from "@/utils/icons/RestaurantIcon";
// import ManagerIcon from "@/utils/icons/ManagerIcon";

// interface SideBarProps {
//   isSideBarOpen: boolean;
//   activePage: string;
//   setActivePage: (value: string) => void;
//   setIsSideBarOpen: (value: boolean) => void;
//   ref: Ref<HTMLDivElement>;
//   currentLanguage?: string;
// }

// const SideBar = ({
//   activePage,
//   isSideBarOpen,
//   ref,

//   // setActivePage,
//   setIsSideBarOpen,
// }: SideBarProps) => {
//   const DrawerBar = useTranslations("DrawerBar");
//   const user = useSelector(selectUser);

//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();

//   const listNames = [
//     {
//       name: DrawerBar("home"),
//       slug: "home",
//       icon: <MyMenuIcon size="20px" color="#374151" />,
//     },
//     {
//       name: DrawerBar("templates"),
//       slug: "templates",
//       icon: <TemplatesIcon size="20px" color="#374151" />,
//     },
//     {
//       name: DrawerBar("restaurants"),
//       slug: "my-restaurants",
//       icon: <RestaurantIcon size="20px" color="#374151" />,
//     },
//     // {
//     //   name: "Templates Store",
//     //   slug: "store",
//     //   icon: <TemplatesIcon size="20px" color="#374151" />,
//     // },
//     {
//       name: DrawerBar("teamAccess"),
//       slug: "managers",
//       icon: <ManagerIcon />,
//     },
//     {
//       name: DrawerBar("translations"),
//       slug: "translations",
//       icon: <TranslateIcon size="20px" color="#374151" />,
//     },
//     {
//       name: DrawerBar("subscriptionPlans"),
//       slug: "plans",
//       icon: <PlansIcon size="20px" color="#374151" />,
//     },
//     {
//       name: DrawerBar("helpSupport"),
//       slug: "support",
//       icon: <HelpIcon size="20px" color="#374151" />,
//     },
//     {
//       name: DrawerBar("settings"),
//       slug: "settings",
//       icon: <SettingsIcon size="20px" color="#374151" />,
//     },
//   ];

//   const handleLogout = async () => {
//     try {
//       const response = await logoutUserAPI(cookies.get("refreshToken")!);
//       if (response.success) {
//         dispatch(userLoggedOut()); // Reset Redux store states
//         router.push("/auth?view=login");
//       } else {
//         console.error("Logout failed:", response.data);
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <div ref={ref}>
//       <div
//         className={`fixed top-0 h-screen w-[70vw] max-w-[20rem] bg-white
//     shadow-lg transform transition-transform duration-300 ease-in-out z-10
//     ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}
//       >
//         <h2 className="text-2xl first-letter:text-custom-red-1 text-gray-800 font-bold tracking-wide  px-5 pt-6 pb-2">
//           {logoName}
//         </h2>
//         <p className="text-gray-500 text-sm px-5 xl:hidden mb-4">
//           Welcome back, {user?.userName}
//         </p>

//         <ul className="space-y-1 mt-4">
//           {listNames.map((item, index) => {
//             const isActive = item.name === activePage;
//             return (
//               <li
//                 key={index}
//                 onClick={() => {
//                   router.push(`/dashboard/${item.slug}`);
//                   setIsSideBarOpen(false);
//                 }}
//                 className={`flex items-center gap-3 px-5 py-3 text-sm font-medium cursor-pointer rounded-lg transition
//             ${
//               isActive
//                 ? "bg-gray-200 text-gray-900"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//               >
//                 <div className="shrink-0">{item.icon}</div>
//                 {item.name}
//               </li>
//             );
//           })}
//         </ul>
//         <div
//           onClick={handleLogout}
//           className="absolute bottom-5 left-0 w-full px-5 py-3  text-gray-700 text-sm font-medium cursor-pointer rounded-lg flex items-center gap-3"
//         >
//           <LogoutIcon color="#374151" />
//           <span>Logout</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
"use client";
import { selectUser } from "@/store/user/userSelectors";
import { PlansIcon } from "@/utils/icons/PlansIcon";
import { TemplatesIcon } from "@/utils/icons/TemplatesIcon";
import { HelpIcon } from "@/utils/icons/HelpIcon";
import { SettingsIcon } from "@/utils/icons/SettingsIcon";
import { MyMenuIcon } from "@/utils/icons/MyMenuIcon";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import React, { Ref, useState } from "react";
import LogoutIcon from "@/utils/icons/LogoutIcon";
import { logoutUserAPI } from "@/res/api";
import { AppDispatch } from "@/store/store";
import { userLoggedOut } from "@/store/actions";
import { logoName } from "@/utils/utils";
import TranslateIcon from "@/utils/icons/TranslateIcon";
import { useTranslations } from "next-intl";
import RestaurantIcon from "@/utils/icons/RestaurantIcon";
import ManagerIcon from "@/utils/icons/ManagerIcon";
import CurrencyIcon from "@/utils/icons/CurrencyIcon";

interface SideBarProps {
  isSideBarOpen: boolean;
  activePage: string;
  setActivePage: (value: string) => void;
  setIsSideBarOpen: (value: boolean) => void;
  ref: Ref<HTMLDivElement>;
  currentLanguage?: string;
  isRTL?: boolean; // Optional prop to handle RTL layout
}

const SideBar = ({
  activePage,
  isSideBarOpen,
  ref,
  setIsSideBarOpen,
  isRTL, // Default to false if not provided
}: SideBarProps) => {
  const DrawerBar = useTranslations("DrawerBar");
  const user = useSelector(selectUser);

  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const listNames = [
    {
      name: DrawerBar("home"),
      slug: "home",
      icon: <MyMenuIcon size="20px" color="#374151" />,
    },
    {
      name: DrawerBar("templates"),
      slug: "templates",
      icon: <TemplatesIcon size="20px" color="#374151" />,
    },
    {
      name: DrawerBar("restaurants"),
      slug: "my-restaurants",
      icon: <RestaurantIcon size="20px" color="#374151" />,
    },
    {
      name: DrawerBar("currency"),
      slug: "currency",
      icon: <CurrencyIcon size="20px" color="#374151" />,
    },
    {
      name: DrawerBar("teamAccess"),
      slug: "managers",
      icon: <ManagerIcon />,
    },
    {
      name: DrawerBar("translations"),
      slug: "translations",
      icon: <TranslateIcon size="20px" color="#374151" />,
    },
    {
      name: DrawerBar("subscriptionPlans"),
      slug: "plans",
      icon: <PlansIcon size="20px" color="#374151" />,
    },
    {
      name: DrawerBar("helpSupport"),
      slug: "support",
      icon: <HelpIcon size="20px" color="#374151" />,
    },
    {
      name: DrawerBar("settings"),
      slug: "settings",
      icon: <SettingsIcon size="20px" color="#374151" />,
    },
  ];

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logoutUserAPI();
      if (response.success) {
        dispatch(userLoggedOut());
        router.push("/auth?view=login");
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div ref={ref}>
      <div
        className={`fixed top-0 h-dvh w-[70vw] max-w-[20rem] bg-white  
          shadow-lg transform transition-transform duration-300 ease-in-out z-10
          ${
            // isSideBarOpen ? "translate-x-0" : "-translate-x-full"
            isSideBarOpen
              ? "translate-x-0"
              : isRTL
              ? "translate-x-full"
              : "-translate-x-full"
          } xl:translate-x-0
          flex flex-col`}
      >
        {/* <div
        className={`fixed top-0 h-dvh w-[70vw] max-w-[20rem] bg-white  
          shadow-lg transform transition-transform duration-300 ease-in-out z-10
          ${
            isSideBarOpen
              ? "translate-x-0"
              : isRTL
              ? "translate-x-full"
              : "-translate-x-full"
          } 
          ${isRTL ? "xl:right-0" : "xl:left-0"}`}
      > */}
        <div className="px-5 pt-6 pb-2">
          <h2 className="text-2xl first-letter:text-custom-red-1 text-gray-800 font-bold tracking-wide">
            {logoName}
          </h2>
          <p className="text-gray-500 text-sm xl:hidden mt-1">
            Welcome back, {user?.user?.userName}
          </p>
        </div>

        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-1 mt-4">
            {listNames.map((item, index) => {
              const isActive = item.name === activePage;
              return (
                <li
                  key={index}
                  onClick={() => {
                    router.push(`/dashboard/${item.slug}`);
                    setIsSideBarOpen(false);
                  }}
                  className={`flex items-center gap-3 px-5 py-3 text-sm font-medium cursor-pointer rounded-lg transition
                    ${
                      pathName.includes(item.slug)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                        
                    ${
                      isActive
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                    
                    `}
                >
                  <div className="shrink-0">{item.icon}</div>
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="text-xs text-gray-500 mb-3 ml-3">
          Version {process.env.NEXT_PUBLIC_APP_VERSION || "1.0"}
        </div>

        {/* Sticky logout at bottom */}
        <div className="mb-4 px-5 py-4 text-gray-700 text-sm font-medium cursor-pointer rounded-lg flex items-center gap-3 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left"
          >
            <LogoutIcon color="#374151" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
          <div className="text-white">Logging out...</div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
