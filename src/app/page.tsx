import HomePage from "@/components/HomePage";
import { getMessages } from "next-intl/server";
import React from "react";

type Messages = {
  TabTitles?: {
    home: string;
  };
};

// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: string };
// }) {
//   const messages: Messages = await getMessages({ locale });
//   const title = messages.TabTitles?.home;
//   return {
//     title,
//   };
// }

export async function generateMetadata() {
  const messages: Messages = await getMessages(); // locale is handled internally
  const title = messages.TabTitles?.home;

  return {
    title,
  };
}

const page = () => {
  return <HomePage />;
};

export default page;
