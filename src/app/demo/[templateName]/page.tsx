import DemoTemplateRender from "./DemoTemplateRender";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ templateName: string }>;
}) {
  const { templateName } = await params;

  return <DemoTemplateRender templateName={templateName} />;
}
