// // import type { Metadata } from 'next';
// // import TemplateRenderer from "@/components/TemplateRenderer";

// // interface PageProps {
// //   params: {
// //     restaurantSlug: string;
// //   };
// // }

// // export async function generateMetadata(
// //   { params }: PageProps
// // ): Promise<Metadata> {
// //   return {
// //     title: `Menu - ${params.restaurantSlug}`,
// //   };
// // }

// // export default function Page({ params }: PageProps) {
// //   return <TemplateRenderer restaurantSlug={params.restaurantSlug} />;
// // }

// import TemplateRenderer from "@/components/TemplateRenderer";

// export default function TemplatePage({
//   params,
// }: {
//   params: { restaurantSlug: string };
// }) {
//   return <TemplateRenderer restaurantSlug={params.restaurantSlug} />;
// }

// // import TemplateRenderer from "@/components/TemplateRenderer";

// // export default async function TemplatePage({
// //   params,
// // }: {
// //   params: { restaurantSlug: string };
// // }) {
// //   return <TemplateRenderer restaurantSlug={params.restaurantSlug} />;
// // }

import React from 'react'

const page = () => {
  return (
    <div>paged</div>
  )
}

export default page