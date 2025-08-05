// "use client";

import DashboardWrapper from "@/components/DashboardWrapper";

// import React, { useState, Suspense, lazy } from "react";
// import { useParams } from "next/navigation";
// import SideBar from "@/components/SideBar";
// import SideBarHeader from "@/components/SideBarHeader";

// // Lazy-loaded components
// const MyMenu = lazy(() => import("@/components/MyMenu"));
// const Settings = lazy(() => import("@/components/Settings"));
// const MyTemplates = lazy(() => import("@/components/MyTemplates"));
// // Add more as needed

// const ROUTES = {
//   DASH_HOME: "home",
//   DASH_SETTINGS: "settings",
//   DASH_TEMPLATES: "my-templates",
// } as const;

// const pageComponents: Record<
//   string,
//   React.LazyExoticComponent<React.ComponentType<any>>
// > = {
//   [ROUTES.DASH_HOME]: MyMenu,
//   [ROUTES.DASH_SETTINGS]: Settings,
//   [ROUTES.DASH_TEMPLATES]: MyTemplates,
// };

// const Page = () => {
//   const params = useParams();
//   const slug = params?.slug as string;
//   const [isSideBarOpen, setIsSideBarOpen] = useState(false);

//   const Component = pageComponents[slug];

//   return (
//     <>
//       <SideBarHeader
//         list={slug}
//         isSideBarOpen={isSideBarOpen}
//         setIsSideBarOpen={setIsSideBarOpen}
//       />

//       <SideBar
//         isSideBarOpen={isSideBarOpen}
//         activePage={slug}
//         setActivePage={() => {}}
//         setIsSideBarOpen={setIsSideBarOpen}
//       />

//       <div className="p-6 xl:ml-[20rem]">
//         <Suspense fallback={<div>Loading...</div>}>
//           {Component ? <Component /> : <div>Page not found</div>}
//         </Suspense>
//       </div>
//     </>
//   );
// };

// export default Page;

export default function Page() {
  return <DashboardWrapper />;
}
