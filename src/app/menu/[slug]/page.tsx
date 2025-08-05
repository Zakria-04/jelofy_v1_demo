import TemplateRenderer from "@/components/TemplateRenderer";
import { getRestaurantMenu } from "@/res/api";
import { notFound } from "next/navigation";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurant = await getRestaurantMenu(slug);

  if (!restaurant) {
    notFound();
  }

  return <TemplateRenderer restaurantSlug={slug} />;
}