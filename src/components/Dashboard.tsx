// "use client";
// import React, { useEffect, useState } from "react";
// import SideBar from "./SideBar";
// import MyMenu from "./MyMenu";
// import Templates from "./Templates";
// import SideBarHeader from "./SideBarHeader";
// import { useDispatch, useSelector } from "react-redux";
// import { selectAccessToken, selectUser } from "@/store/user/userSelectors";
// import { selectMeals } from "@/store/meal/mealSelectors";
// import { AppDispatch } from "@/store/store";
// import { getAllMealsAPI } from "@/store/meal/mealThunks";
// import { getAuthenticatedUserAPI } from "@/store/user/userThunks";
// import Plans from "./Plans";
// import HelpSupport from "./HelpSupport";
// import Settings from "./Settings";
// import Restaurant from "./Restaurant";
// import MyTemplates from "./MyTemplates";

// //! This component was used to render the dashboard page and the sidebar using only components
// //! but now we are using next.js routing and dynamic routing to render the pages
// //! so this component is not used anymore but we will keep it for future reference 
// //! (DO NOT DELETE THIS COMPONENT)

// const Pages = {
//   MY_MENU: "Dashboard",
//   TEMPLATES: "Templates Store",
//   RESTAURANT: "My Restaurants",
//   PLANS: "Subscription Plans",
//   SUPPORT: "Help/Support",
//   SETTINGS: "Settings",
//   TEMPLATESTORE: "My Templates",
// } as const;

// type PageComponents = {
//   [key: string]: React.ElementType;
// };

// const pageComponents: PageComponents = {
//   [Pages.MY_MENU]: MyMenu,
//   [Pages.TEMPLATES]: Templates,
//   [Pages.RESTAURANT]: Restaurant,
//   [Pages.PLANS]: Plans,
//   [Pages.SUPPORT]: HelpSupport,
//   [Pages.SETTINGS]: Settings,
//   [Pages.TEMPLATESTORE]: MyTemplates,
// };

// const Dashboard = () => {
//   const user = useSelector(selectUser);
//   const meals = useSelector(selectMeals);
//   const accessToken = useSelector(selectAccessToken);
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     // Fetch meals
//     const fetchAllHomeAPIS = async () => {
//       try {
//         await dispatch(getAllMealsAPI(accessToken!)).unwrap();
//         const getUserInfo = await dispatch(
//           getAuthenticatedUserAPI(accessToken!)
//         ).unwrap();
//       } catch (error) {
//       }
//     };

//     fetchAllHomeAPIS();
//   }, []);

//   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
//   const [activePage, setActivePage] = useState<string>(Pages.MY_MENU);

//   const ActiveComponent = pageComponents[activePage];

//   return (
//     <>
//       {/* Header */}
//       <SideBarHeader
//         list={activePage}
//         isSideBarOpen={isSideBarOpen}
//         setIsSideBarOpen={setIsSideBarOpen}
//       />

//       {/* Side Bar */}
//       <SideBar
//         isSideBarOpen={isSideBarOpen}
//         activePage={activePage}
//         setActivePage={setActivePage}
//         setIsSideBarOpen={setIsSideBarOpen}
//       />

//       {/* Main Content */}
//       <div
//         className={`p-6 transition-margin duration-300 ease-in-out xl:ml-[20rem]`}
//       >
//         {/* {ActiveComponent && <ActiveComponent isSideBarOpen={isSideBarOpen} />} */}
//       </div>
//     </>
//   );
// };

// export default Dashboard;
