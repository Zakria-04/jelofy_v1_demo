import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { getAllStoreTemplatesAPI } from "@/store/template-store/templateStoreThunks";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const TemplateStoreRender = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { templateLists } = useAppSelector((state) => state.templateStore);
  // const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        await dispatch(getAllStoreTemplatesAPI());
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      }
    };

    fetchTemplates();
  }, [dispatch]);

  if (!templateLists?.length) {
    return <div className="mt-10">No templates available</div>;
  }

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templateLists.map((template) => (
        // <TemplateCard key={template._id} template={template} />
        <div key={template._id}>{template._id}</div>
      ))}
    </div>
  );
};

// const TemplateCard = ({
//   template,
// }: {
//   template: {
//     _id: string;
//     name: string;
//     description: string;
//     imageURL: string;
//     price: number;
//   };
// }) => (
//   <div className="p-4 border bg-custom-white-1 shadow-xl rounded-lg">
//     <div className="flex flex-col gap-4">
//       <Image
//         src={template.imageURL}
//         alt={template.name}
//         className="w-full h-48 object-cover rounded-md"
//         width={300}
//         height={192}
//         priority
//       />
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">{template.name}</h3>
//         <p className="text-gray-500 line-clamp-2">{template.description}</p>
//       </div>
//     </div>
//     <Link
//       href={{
//         pathname: `/template`,
//         query: {
//           id: template._id,
//           name: template.name,
//           description: template.description,
//           imageURL: template.imageURL,
//           price: template.price,
//         },
//       }}
//       className=" bg-custom-red-4 text-white px-4 py-1 rounded-md hover:bg-custom-red-2 transition"
//     >
//       Details
//     </Link>
//   </div>
// );

export default TemplateStoreRender;
