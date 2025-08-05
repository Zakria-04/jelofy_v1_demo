// "use client";
// import {
//   frontendDomain,
//   getTemplateUiConfigAPI,
//   updateRestaurantLogoAPI,
//   updateTemplateAPI,
// } from "@/res/api";
// import { AppDispatch } from "@/store/store";
// import { getSelectedThemeAPI } from "@/store/template/templateThunks";
// import BackIcon from "@/utils/icons/BackIcon";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import "./editor.css"
// // Types
// type ThemePrimitive = string | number | boolean | null;
// type ThemeValue = ThemePrimitive | ThemeObject;
// export type ThemeObject = {
//   [key: string]: ThemeValue;
// };

// type TemplateField = {
//   path: string;
//   key: string;
//   groupKey: string;
//   inputType: string;
// };

// const EditorPage = () => {
//   const router = useRouter();
//   const [templateConfigs, setTemplateConfigs] = useState<TemplateField[]>([]);
//   const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});
//   const [editedTemplate, setEditedTemplate] = useState<ThemeObject | null>(
//     null
//   );
//   const [templateId, setTemplateId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [iframeReloadKey, setIframeReloadKey] = useState(Date.now());
//   const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

//   // const handleImageUpload = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     const imageUrl = URL.createObjectURL(file);
//   //     setUploadedImage(imageUrl);
//   //   }
//   // };

//   // const handleImageUpload = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     const imageUrl = URL.createObjectURL(file);
//   //     setUploadedImageFile(file); // Store the File object
//   //     setImagePreviewUrl(imageUrl); // Store the preview URL
//   //   }
//   // };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setUploadedImageFile(file); // Store the File object
//       setImagePreviewUrl(imageUrl); // Store the preview URL
//     }
//   };
//   // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = e.target.files?.[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setUploadedImage(file);
//   //       reader.readAsDataURL(file);
//   //     };
//   //   }
//   // };

//   const params = useSearchParams();
//   const dispatch = useDispatch<AppDispatch>();

//   const searchParams = {
//     restaurantId: params.get("restaurantId"),
//     businessUrl: params.get("businessUrl"),
//   };

//   useEffect(() => {
//     const fetchAllTemplateConfigs = async () => {
//       try {
//         const config = await getTemplateUiConfigAPI("SimpleBites");
//         if (config) {
//           setTemplateConfigs(config.ui);
//         } else {
//           console.error("No template configs found.");
//         }
//       } catch (error) {
//         console.error("Error fetching template configs:", error);
//       }
//     };

//     const fetchRestaurantTemplateDesign = async () => {
//       try {
//         const template = await dispatch(
//           getSelectedThemeAPI(searchParams.restaurantId!)
//         ).unwrap();
//         setEditedTemplate(template.template.theme);
//         setTemplateId(template.template._id);
//       } catch  {
//         setError("Failed to load template design.");
//       }
//     };

//     fetchRestaurantTemplateDesign();
//     fetchAllTemplateConfigs();
//   }, [dispatch, searchParams.restaurantId]);

//   const groupedConfigs = templateConfigs.reduce(
//     (groups: { [key: string]: TemplateField[] }, field) => {
//       if (!groups[field.groupKey]) {
//         groups[field.groupKey] = [];
//       }
//       groups[field.groupKey].push(field);
//       return groups;
//     },
//     {}
//   );

//   const handleThemeUpdate = async () => {
//     if (!editedTemplate || !templateId) {
//       return;
//     }

//     const formData = new FormData();

//     setLoading(true);

//     setError(null);
//     try {
//       setLoading(true);
//       const updateTheme = await updateTemplateAPI({
//         templateId: templateId,
//         theme: editedTemplate,
//       });

//       if (uploadedImageFile) {
//         formData.append("image", uploadedImageFile);

//         const updateLogo = await updateRestaurantLogoAPI(templateId, formData);
//         return updateLogo;
//       }

//       return updateTheme;
//     } catch (error) {
//       setError("Failed to update theme.");
//       console.error("Error updating theme:", error);
//     } finally {
//       setLoading(false);
//       setIframeReloadKey(Date.now());
//       setImagePreviewUrl(null);
//       setUploadedImageFile(null);

//       window.location.reload();
//     }
//   };

//   const toggleGroup = (groupKey: string) => {
//     setOpenGroups((prev) => ({
//       ...prev,
//       [groupKey]: !prev[groupKey],
//     }));
//   };

//   function setNestedValue(
//     obj: ThemeObject,
//     path: string[],
//     value: ThemeValue
//   ): ThemeObject {
//     const newObj = { ...obj };
//     let current: ThemeObject = newObj;

//     for (let i = 0; i < path.length; i++) {
//       const key = path[i];
//       if (i === path.length - 1) {
//         current[key] = value;
//       } else {
//         current[key] = {
//           ...(typeof current[key] === "object" && current[key] !== null
//             ? (current[key] as ThemeObject)
//             : {}),
//         };
//         current = current[key] as ThemeObject;
//       }
//     }

//     return newObj;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 flex flex-col md:flex-row gap-6">
//       <header className="flex items-start">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2"
//         >
//           <div className="size-9">
//             <BackIcon color="#D84040" />
//           </div>
//           <span className="hidden sm:inline">Back</span>
//         </button>
//       </header>

//       {/* Phone Frame */}
//       <div className="flex justify-center md:w-1/2">
//         <div className="border-8 border-black rounded-3xl overflow-hidden w-[350px] h-[650px] xl:w-[400px] xl:h-[750px] bg-white shadow-lg relative">
//           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-2 rounded-b-lg bg-black mt-2" />
//           <iframe
//             key={iframeReloadKey}
//             // src={`${frontendDomain}/menu/${searchParams.businessUrl}?v=${iframeReloadKey}`}
//             src={`${frontendDomain}/menu/${searchParams.businessUrl}`}
//             className="w-full h-full"
//             frameBorder="0"
//             allowFullScreen
//             title="Live Menu Preview"
//             onError={(e) => {
//               console.error("Iframe failed to load:", e);
//               setError(
//                 "Failed to load preview. Please check the URL and try again."
//               );
//             }}
//           />
//         </div>
//       </div>

//       {/* Design Editor */}
//       <div className="flex flex-col md:w-1/2 space-y-4">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Edit Your Design
//         </h2>

//         <div className="bg-white rounded-xl shadow p-6 space-y-4">
//           {Object.keys(groupedConfigs).map((groupKey) => (
//             <div key={groupKey} className="border-b pb-2">
//               <button
//                 onClick={() => toggleGroup(groupKey)}
//                 className="w-full flex justify-between items-center text-left font-semibold text-lg py-2"
//               >
//                 {groupKey}
//                 <span>{openGroups[groupKey] ? "▲" : "▼"}</span>
//               </button>

//               {/* Category Group key */}
//               {openGroups["Category"] && groupKey === "Category" && (
//                 <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-3 mt-3 mb-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-base font-semibold text-gray-800">
//                         Show Categories
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         Toggle to enable or disable category filtering. If
//                         disabled, all meals will be shown without category
//                         grouping.
//                       </p>
//                     </div>
//                     <label className="inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         className="sr-only peer"
//                         // checked={categoryEnabled}
//                         // checked={editedTemplate?.category?.enabled ?? true}
//                         checked={
//                           typeof editedTemplate?.category === "object" &&
//                           editedTemplate?.category !== null
//                             ? (editedTemplate.category as { enabled?: boolean })
//                                 .enabled ?? true
//                             : true
//                         }
//                         // onChange={() => setCategoryEnabled(!categoryEnabled)}
//                         onChange={(e) => {
//                           const updatedTemplate = setNestedValue(
//                             editedTemplate ?? {},
//                             ["category", "enabled"],
//                             e.target.checked
//                           );
//                           setEditedTemplate(updatedTemplate);
//                         }}
//                       />
//                       <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:bg-custom-red-4 transition-colors"></div>
//                       <div className="absolute w-5 h-5 bg-white rounded-full shadow-sm transform peer-checked:translate-x-5 transition-transform duration-200"></div>
//                     </label>
//                   </div>
//                 </div>
//               )}

//               {/* render the contact */}
//               {openGroups["Header"] && groupKey === "Header" && (
//                 <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-3 mt-3 mb-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-base font-semibold text-gray-800">
//                         Show Contact Information
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         Toggle to enable or disable the contact information
//                         section in the header. If disabled, the contact details
//                         will not be displayed.
//                       </p>
//                     </div>
//                     <label className="inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         className="sr-only peer"
//                         // checked={categoryEnabled}
//                         // checked={
//                         //   editedTemplate?.header?.contactInformation?.enabled ??
//                         //   true
//                         // }
//                         checked={
//                           typeof editedTemplate?.header === "object" &&
//                           editedTemplate?.header !== null &&
//                           "contactInformation" in editedTemplate.header &&
//                           typeof (editedTemplate.header as ThemeObject)
//                             .contactInformation === "object" &&
//                           (editedTemplate.header as ThemeObject)
//                             .contactInformation !== null
//                             ? (
//                                 (editedTemplate.header as ThemeObject)
//                                   .contactInformation as { enabled?: boolean }
//                               ).enabled ?? true
//                             : true
//                         }
//                         // onChange={() => setCategoryEnabled(!categoryEnabled)}
//                         // onChange={(e) => {
//                         //   setCategoryEnabled(e.target.checked);
//                         //   const updatedTemplate = setNestedValue(
//                         //     editedTemplate ?? {},
//                         //     ["Header", "enabled"],
//                         //     e.target.checked
//                         //   );
//                         //   setEditedTemplate(updatedTemplate);
//                         // }}
//                         onChange={(e) => {
//                           const updatedTemplate = setNestedValue(
//                             editedTemplate ?? {},
//                             ["header", "contactInformation", "enabled"],
//                             e.target.checked
//                           );
//                           setEditedTemplate(updatedTemplate);
//                         }}
//                       />
//                       <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:bg-custom-red-4 transition-colors"></div>
//                       <div className="absolute w-5 h-5 bg-white rounded-full shadow-sm transform peer-checked:translate-x-5 transition-transform duration-200"></div>
//                     </label>
//                   </div>
//                 </div>
//               )}

//               {openGroups[groupKey] && (
//                 <div className="space-y-4 mt-2">
//                   {groupedConfigs[groupKey].map((field, index) => {
//                     const splitPath = field.path.split(".");
//                     const rawValue = splitPath.reduce<ThemeValue | undefined>(
//                       (obj, key) =>
//                         obj && typeof obj === "object"
//                           ? (obj as ThemeObject)[key]
//                           : undefined,
//                       editedTemplate ?? {}
//                     );
//                     const value =
//                       typeof rawValue === "object" || rawValue === undefined
//                         ? ""
//                         : rawValue;

//                     return (
//                       <div key={index} className="flex flex-col">
//                         {field.inputType === "file" ? (
//                           <div style={{ margin: "10px 0" }}>
//                             <label
//                               style={{
//                                 display: "block",
//                                 marginBottom: "8px",
//                                 fontWeight: "500",
//                                 color: "#333",
//                               }}
//                             >
//                               {field.key.replace(/_/g, " ")}
//                             </label>

//                             <div
//                               style={{
//                                 border: "1px dashed #ccc",
//                                 padding: "20px",
//                                 borderRadius: "4px",
//                                 textAlign: "center",
//                                 backgroundColor: "#f9f9f9",
//                               }}
//                             >
//                               <input
//                                 type="file"
//                                 name="image"
//                                 onChange={handleImageUpload}
//                                 // onChange={handleImageChange}
//                                 accept="image/*"
//                                 style={{ display: "none" }}
//                                 id={`file-upload-${field.key}`}
//                               />

//                               <label
//                                 htmlFor={`file-upload-${field.key}`}
//                                 style={{
//                                   display: "inline-block",
//                                   padding: "8px 16px",
//                                   backgroundColor: "#4CAF50",
//                                   color: "white",
//                                   borderRadius: "4px",
//                                   cursor: "pointer",
//                                   marginBottom: "10px",
//                                 }}
//                               >
//                                 Choose File
//                               </label>

//                               {imagePreviewUrl ? (
//                                 <div style={{ marginTop: "10px" }}>
//                                   <Image
//                                     src={imagePreviewUrl}
//                                     alt="Uploaded preview"
//                                     width={200}
//                                     height={200}
//                                     style={{
//                                       maxWidth: "100%",
//                                       maxHeight: "200px",
//                                       borderRadius: "4px",
//                                     }}
//                                   />
//                                   <p
//                                     style={{
//                                       marginTop: "8px",
//                                       fontSize: "12px",
//                                     }}
//                                   >
//                                     Click the button above to change
//                                   </p>
//                                 </div>
//                               ) : (
//                                 <p
//                                   style={{
//                                     margin: "0",
//                                     fontSize: "14px",
//                                     color: "#666",
//                                   }}
//                                 >
//                                   No file chosen
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         ) : (
//                           <>
//                             {" "}
//                             <label className="text-gray-700 font-semibold mb-1 capitalize">
//                               {field.key.replace(/_/g, " ")}
//                             </label>
//                             <input
//                               type={field.inputType}
//                               value={
//                                 typeof value === "boolean"
//                                   ? value.toString()
//                                   : value
//                               }
//                               onChange={(e) => {
//                                 const inputValue = e.target.value;
//                                 const path = field.path.split(".");
//                                 if (editedTemplate) {
//                                   const updated = setNestedValue(
//                                     editedTemplate,
//                                     path,
//                                     inputValue
//                                   );
//                                   setEditedTemplate(updated);
//                                 }
//                               }}
//                               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                               style={
//                                 field.inputType === "color"
//                                   ? { height: "40px" }
//                                   : {}
//                               }
//                             />
//                           </>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           ))}

//           <button
//             onClick={handleThemeUpdate}
//             className="w-full bg-custom-red-4 text-white py-2 rounded-l"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>

//       {/* Error Modal */}
//       {error && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 shadow-lg">
//             <h2 className="text-xl font-bold text-red-600">Error</h2>
//             <p className="text-gray-700">{error}</p>
//             <button
//               onClick={() => setError(null)}
//               className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Loading Spinner */}
//       {loading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
//             <div className="flex flex-col items-center space-y-4">
//               {/* Animated spinner */}
//               <div className="relative w-12 h-12">
//                 <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
//                 <div className="absolute inset-0 rounded-full border-4 border-custom-red-4 border-t-transparent animate-spin"></div>
//               </div>

//               {/* Loading text with animated dots */}
//               <div className="text-center space-y-2">
//                 <p className="text-lg font-medium text-gray-800">
//                   Saving Template
//                 </p>
//                 <p className="text-gray-500 flex justify-center items-center">
//                   Please wait
//                   <span className="inline-block ml-1 space-x-0.5">
//                     <span
//                       className="inline-block animate-bounce"
//                       style={{ animationDelay: "0ms" }}
//                     >
//                       .
//                     </span>
//                     <span
//                       className="inline-block animate-bounce"
//                       style={{ animationDelay: "150ms" }}
//                     >
//                       .
//                     </span>
//                     <span
//                       className="inline-block animate-bounce"
//                       style={{ animationDelay: "300ms" }}
//                     >
//                       .
//                     </span>
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditorPage;
"use client";
import {
  frontendDomain,
  getDemoMealsAPI,
  getTemplateUiConfigAPI,
  updateRestaurantLogoAPI,
  updateTemplateAPI,
} from "@/res/api";
import { logoName } from "@/utils/utils";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfigSettingsIcon from "@/utils/icons/ConfigSettingsIcon";
import CheckIcon from "@/utils/icons/CheckIcon";
import InformationIcon from "@/utils/icons/InformationIcon";
import SelectArrowIcon from "@/utils/icons/SelectArrowIcon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getRestaurantMenuAPI } from "@/store/store/storeThunks";
import Link from "next/link";
import EyeIcon from "@/utils/icons/EyeIcon";
import TemplateIcon from "@/utils/icons/TemplateIcon";
import MealIcon from "@/utils/icons/MealIcon";
import "./editor.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";

interface TemplateConfigItem {
  key: string;
  labelKey: string;
  inputType: "color" | "text" | "file" | "checkbox";
  defaultValue?: string;
  path: string;
  description: string;
  // Add other known properties here
}

const EditorPage = () => {
  const TemplateUiConfig = useTranslations("TemplateUiConfig");
  const EditorPage = useTranslations("EditorPage");
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const params = {
    restaurantId: searchParams.get("restaurantId"),
    businessUrl: searchParams.get("businessUrl"),
    selectedTemplate: searchParams.get("selectedTemplate"),
  };
  const [templateConfigs, setTemplateConfigs] = useState<
    Record<string, TemplateConfigItem[]>
  >({});
  const [selectedSection, setSelectedSection] = useState("");
  const [editedTemplateValue, setEditedTemplateValue] = useState<
    Record<string, unknown>
  >({});
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [mealsTest, setMealsTest] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const sendMessage = () => {
  //   if (!iframeRef.current) return;

  //   iframeRef.current.contentWindow?.postMessage(
  //     {
  //       type: "template-update",
  //       template: editedTemplateValue || {},
  //       meals: mealsTest || [],
  //     },
  //     frontendDomain || ""
  //   );
  // };

  const sendMessage = useCallback(() => {
    if (!iframeRef.current) return;

    iframeRef.current.contentWindow?.postMessage(
      {
        type: "template-update",
        template: editedTemplateValue || {},
        meals: mealsTest || [],
      },
      frontendDomain || ""
    );
  }, [editedTemplateValue, mealsTest]);

  const handleTemplateInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const path = name?.split(".");
    const updatedValue = structuredClone(editedTemplateValue);
    let current = updatedValue;

    for (let i = 0; i < path?.length - 1; i++) {
      const key = path[i];

      if (!current[key]) {
        current[key] = {};
      }

      current = current[key] as Record<string, unknown>;
    }

    current[path[path?.length - 1]] = value;

    setEditedTemplateValue(updatedValue);
    sendMessage();
  };

  useEffect(() => {
    if (Object.keys(editedTemplateValue)?.length > 0) {
      sendMessage();
    }
  }, [editedTemplateValue, sendMessage]);

  useEffect(() => {
    if (
      !params.restaurantId ||
      !params.businessUrl ||
      !params.selectedTemplate
    ) {
      console.error("Missing required parameters for the editor page.");
      return;
    }

    const fetchTemplateConfig = async () => {
      try {
        const fetchResponse = await getTemplateUiConfigAPI(
          params?.selectedTemplate || ""
        );

        if (fetchResponse.ui) {
          setTemplateConfigs(fetchResponse.ui);
        } else {
          console.error("No template configurations found.");
        }
      } catch (error) {
        console.error("Error fetching template configuration:", error);
      }
    };

    const fetchUserTemplate = async () => {
      try {
        const response = await dispatch(
          getRestaurantMenuAPI(params.businessUrl || "")
        ).unwrap();

        setRestaurantId(response.restaurantId);
        setEditedTemplateValue(response.template);
        setSelectedTemplateId(response.templateId);
      } catch (error) {
        console.error("Error fetching user template:", error);
      }
    };

    const getDemoMealsData = async () => {
      try {
        const response = await getDemoMealsAPI();
        setMealsTest(response);
      } catch (error) {
        console.error("Error fetching demo meals data:", error);
      }
    };

    fetchTemplateConfig();
    fetchUserTemplate();
    getDemoMealsData();
  }, [
    params.restaurantId,
    params.businessUrl,
    params.selectedTemplate,
    dispatch,
    // mealsTest,
  ]);

  interface NestedObject {
    [key: string]: unknown;
  }

  // const getNestedValue = (obj: NestedObject, path: string) => {
  //   return path.split(".").reduce((o, p) => o?.[p], obj);
  // };

  // const getNestedValue = (
  //   obj: Record<string, unknown>,
  //   path: string
  // ): unknown => {
  //   return path.split(".").reduce((o: Record<string, unknown>, p: string) => {
  //     return (o?.[p] as Record<string, unknown>) || {};
  //   }, obj);
  // };

  const getNestedValue = (
    obj: Record<string, unknown>,
    path: string
  ): string | null => {
    const result = path
      .split(".")
      .reduce((o: Record<string, unknown>, p: string) => {
        return (o?.[p] as Record<string, unknown>) || {};
      }, obj);

    return typeof result === "string" ? result : null;
  };

  //   const getNestedValue = (obj, path: string) => {
  //   return path.split(".").reduce((o, p) => o?.[p], obj);
  // };

  // Cleanup effect for object URLs
  useEffect(() => {
    return () => {
      // Recursively find and revoke all blob URLs in the template
      const revokeBlobUrls = (obj: NestedObject) => {
        Object.values(obj).forEach((value) => {
          if (typeof value === "string" && value.startsWith("blob:")) {
            URL.revokeObjectURL(value);
          } else if (typeof value === "object" && value !== null) {
            revokeBlobUrls(value as NestedObject);
          }
        });
      };
      revokeBlobUrls(editedTemplateValue);
    };
  }, [editedTemplateValue]);

  const handleDynamicFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const fieldPath = e.target.name; // e.g., "header.logo.url"

    if (!file || !fieldPath) return;

    // Validate file if needed
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Create preview URL
    const tempUrl = URL.createObjectURL(file);

    // Update the uploaded image file state
    setImageUpload(file);

    // Update state using immutable update pattern
    setEditedTemplateValue((prev) => {
      // Create a deep copy of the previous state
      const newValue = JSON.parse(JSON.stringify(prev));
      const pathParts = fieldPath.split(".");
      let current = newValue;

      // Navigate through nested structure
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }

      // Clean up previous URL if it was a blob
      const prevValue = current[pathParts[pathParts.length - 1]];
      if (typeof prevValue === "string" && prevValue.startsWith("blob:")) {
        URL.revokeObjectURL(prevValue);
      }

      // Set new value
      current[pathParts[pathParts.length - 1]] = tempUrl;

      return newValue;
    });

    // Send update to iframe
    sendMessage();
  };

  const handleSaveChanges = async () => {
    if (!selectedTemplateId) {
      console.error("Template ID is not set.");
      return;
    }
    setIsLoading(true);
    try {
      await updateTemplateAPI({
        templateId: selectedTemplateId,
        theme: editedTemplateValue,
      });

      if (imageUpload) {
        const formData = new FormData();
        formData.append("image", imageUpload);

        await updateRestaurantLogoAPI(selectedTemplateId, formData);
      }

      // setIsDemo(false) //TODO show the actual user meals when user click save changes
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen">
      {/* Left panel - Improved Design */}
      <nav className="bg-white border-r border-gray-200 lg:w-[40vw] p-6 h-screen overflow-y-auto">
        {/* Header Section */}
        <section className="sticky top-0 bg-white pb-6 z-10">
          <div className="flex items-center justify-between mb-5">
            <Link href="/dashboard/home">
              <h1 className="text-3xl font-bold first-letter:text-custom-red-4 text-gray-800">
                {logoName}
              </h1>
            </Link>
            <button
              onClick={handleSaveChanges}
              className="bg-custom-red-4 text-white px-4 py-2 rounded-md hover:bg-custom-red-3 transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <CheckIcon />
              {EditorPage("save")}
            </button>
          </div>

          <p className="text-gray-500 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
            <InformationIcon />
            {EditorPage("description")}
          </p>
        </section>

        {/* Template Configuration Section */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ConfigSettingsIcon />
            {TemplateUiConfig("title")}
          </h2>

          {/* Section Switcher - Accordion Style with Animations */}
          <div className="space-y-2">
            {Object.keys(templateConfigs).map((section) => (
              <motion.div
                key={section}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={false}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  onClick={() =>
                    setSelectedSection(
                      selectedSection === section ? "" : section
                    )
                  }
                  className={`p-4 w-full flex justify-between items-center transition-colors ${
                    selectedSection === section
                      ? "bg-custom-red-4 text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                  }`}
                  whileHover={{ scale: selectedSection === section ? 1 : 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="font-medium">{section}</span>
                  <motion.span
                    animate={{
                      rotate: selectedSection === section ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <SelectArrowIcon />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {selectedSection === section && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                          opacity: { duration: 0.2 },
                          height: { duration: 0.3 },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                          opacity: { duration: 0.1 },
                          height: { duration: 0.2 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-white border-t border-gray-200 space-y-4">
                        {templateConfigs[section].map((item) => {
                          const path = item?.path?.split(".");
                          const updatedValue =
                            structuredClone(editedTemplateValue);
                          let current = updatedValue;

                          for (let i = 0; i < path?.length - 1; i++) {
                            const key = path[i];

                            if (!current[key]) {
                              current[key] = {};
                            }

                            current = current[key] as Record<string, unknown>;
                          }

                          return (
                            <motion.div
                              key={item.labelKey}
                              className="space-y-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                transition: { delay: 0.1 },
                              }}
                            >
                              <label className="block text-sm font-medium text-gray-700">
                                {TemplateUiConfig(item.labelKey)}
                              </label>
                              {item.inputType === "color" && (
                                <div className="flex items-center gap-3">
                                  <motion.input
                                    type="color"
                                    name={item.path}
                                    onChange={handleTemplateInputChange}
                                    // defaultValue={
                                    //   current[path[path?.length - 1]] || "#000"
                                    // }
                                    defaultValue={
                                      // Ensure we get a string value or fallback to "#000"
                                      typeof current[path[path.length - 1]] ===
                                      "string"
                                        ? (current[
                                            path[path.length - 1]
                                          ] as string)
                                        : "#000"
                                    }
                                    className="w-10 h-10 border rounded cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  />
                                  <span className="text-xs text-gray-500">
                                    {item.defaultValue}
                                  </span>
                                </div>
                              )}
                              {item.inputType === "file" && (
                                <div className="flex items-center gap-2">
                                  <motion.label
                                    className="cursor-pointer bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded border border-gray-300 text-sm font-medium text-gray-700 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    {TemplateUiConfig("file")}
                                    <input
                                      type="file"
                                      name={item.path} // Use the full path like "header.logo.url"
                                      onChange={handleDynamicFileUpload}
                                      className="hidden"
                                      accept="image/*" // Restrict to images if needed
                                    />
                                  </motion.label>
                                  <span className="text-xs text-gray-500">
                                    {TemplateUiConfig("noFile")}
                                  </span>

                                  {/* Preview thumbnail */}
                                  {getNestedValue(
                                    editedTemplateValue,
                                    item.path
                                  ) && (
                                    <Image
                                      src={
                                        getNestedValue(
                                          editedTemplateValue,
                                          item.path
                                        ) as string
                                      }
                                      className="h-8 w-8 object-cover rounded"
                                      alt="Preview"
                                      width={32}
                                      height={32}
                                    />
                                  )}
                                </div>
                              )}
                              {item.inputType === "text" && (
                                <motion.input
                                  type="text"
                                  name={item.path}
                                  onChange={handleTemplateInputChange}
                                  // defaultValue={
                                  //   current[path[path?.length - 1]] || ""
                                  // }
                                  defaultValue={
                                    // Ensure we get a string value or fallback to "#000"
                                    typeof current[path[path?.length - 1]] ===
                                    "string"
                                      ? (current[
                                          path[path.length - 1]
                                        ] as string)
                                      : "#000"
                                  }
                                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-red-4 focus:border-custom-red-4 sm:text-sm"
                                  whileFocus={{ scale: 1.01 }}
                                />
                              )}
                              {item.inputType === "checkbox" && (
                                <motion.div
                                  className="relative group"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.1 },
                                  }}
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }} // Added for mobile touch feedback
                                >
                                  {/* Animated border container - adjusted for mobile */}
                                  <div
                                    className={`absolute inset-0 rounded-lg md:rounded-xl pointer-events-none 
      ${
        current[path[path?.length - 1]]
          ? "bg-gradient-to-br from-emerald-100/50 to-teal-100/50 border border-emerald-200 md:border-2"
          : "bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 md:border-2"
      }`}
                                  >
                                    <motion.div
                                      className="absolute inset-0 rounded-lg"
                                      animate={{
                                        opacity: current[path[path?.length - 1]]
                                          ? 1
                                          : 0,
                                        scale: current[path[path?.length - 1]]
                                          ? 1
                                          : 0.95,
                                      }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-200/20 via-transparent to-transparent" />
                                    </motion.div>
                                  </div>

                                  {/* Main content card - responsive padding */}
                                  <div
                                    className={`relative p-3 sm:p-4 rounded-lg backdrop-blur-sm transition-all duration-300
      ${
        current[path[path?.length - 1]]
          ? "shadow-[0_4px_20px_-8px_rgba(16,185,129,0.3)]"
          : "shadow-sm"
      }`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                      <div className="flex-1">
                                        <div className="flex items-start gap-3">
                                          {/* Custom pill-shaped toggle - size adjusted for mobile */}
                                          <label className="relative inline-flex items-center cursor-pointer mt-0.5">
                                            <input
                                              type="checkbox"
                                              name={item.path}
                                              // checked={
                                              //   current[
                                              //     path[path?.length - 1]
                                              //   ] || false
                                              // }
                                              checked={
                                                current[path[path?.length - 1]]
                                                  ? true
                                                  : false
                                              }
                                              onChange={(e) => {
                                                const updatedValue =
                                                  structuredClone(
                                                    editedTemplateValue
                                                  );
                                                let current = updatedValue;

                                                for (
                                                  let i = 0;
                                                  i < path?.length - 1;
                                                  i++
                                                ) {
                                                  const key = path[i];
                                                  if (!current[key]) {
                                                    current[key] = {};
                                                  }
                                                  current = current[
                                                    key
                                                  ] as Record<string, unknown>;
                                                }

                                                current[
                                                  path[path?.length - 1]
                                                ] = e.target.checked;
                                                setEditedTemplateValue(
                                                  updatedValue
                                                );
                                                sendMessage();
                                              }}
                                              className="sr-only peer"
                                            />
                                            {/* Responsive toggle size */}
                                            <div
                                              className={`w-12 h-7 md:w-14 md:h-8 flex items-center rounded-full px-1 transition-all duration-300
                ${
                  current[path[path?.length - 1]]
                    ? "justify-end bg-emerald-500"
                    : "justify-start bg-gray-300"
                }`}
                                            >
                                              <div className="flex items-center justify-center h-5 w-5 md:h-6 md:w-6 rounded-full bg-white shadow-md">
                                                {current[
                                                  path[path?.length - 1]
                                                ] ? (
                                                  <svg
                                                    className="w-3 h-3 md:w-4 md:h-4 text-emerald-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M5 13l4 4L19 7"
                                                    />
                                                  </svg>
                                                ) : (
                                                  <svg
                                                    className="w-3 h-3 md:w-4 md:h-4 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M6 18L18 6M6 6l12 12"
                                                    />
                                                  </svg>
                                                )}
                                              </div>
                                            </div>
                                          </label>

                                          <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                                              {TemplateUiConfig(item.labelKey)}
                                            </h3>
                                            {item.description && (
                                              <p className="text-xs text-gray-500 mt-1 leading-tight">
                                                {TemplateUiConfig(
                                                  item.description
                                                )}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Status badge - moves below on mobile */}
                                      <div
                                        className={`self-end sm:self-center px-2 py-1 rounded-full text-xs font-medium flex items-center
          ${
            current[path[path?.length - 1]]
              ? "bg-emerald-100 text-emerald-800"
              : "bg-gray-100 text-gray-500"
          }`}
                                      >
                                        {current[path[path?.length - 1]] ? (
                                          <>
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                                            {TemplateUiConfig("active")}
                                          </>
                                        ) : (
                                          <>
                                            <span className="w-2 h-2 rounded-full bg-gray-400 mr-1.5"></span>
                                            {TemplateUiConfig("inactive")}
                                          </>
                                        )}
                                      </div>
                                    </div>

                                    {/* Animated decorative elements - thinner on mobile */}
                                    <motion.div
                                      className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 rounded-b-lg overflow-hidden"
                                      animate={{
                                        scaleX: current[path[path?.length - 1]]
                                          ? 1
                                          : 0,
                                        opacity: current[path[path?.length - 1]]
                                          ? 1
                                          : 0,
                                      }}
                                      transition={{ duration: 0.4 }}
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-300"></div>
                                    </motion.div>
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
      </nav>
      {/* Right panel - phone frame */}
      <aside className="flex-1 bg-gray-50 p-8 overflow-auto">
        {/* Preview mode selector */}
        <div className="flex justify-center space-x-2 sm:space-x-4 md:space-x-6 mb-6">
          {/* Live Preview Button */}
          <Link href={`/menu/${params?.businessUrl || ""}`} target="_blank">
            <button
              className="
      px-2 py-1.5 sm:px-3 sm:py-2 sm:text-sm lg:text-lg 
      font-medium sm:font-semibold text-gray-700 hover:text-custom-red-4 
      transition-colors border-b-2 border-transparent hover:border-custom-red-4
      flex items-center gap-0.5 sm:gap-1
      whitespace-nowrap
    "
            >
              <span>
                <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span className="">{EditorPage("live")}</span>{" "}
              {EditorPage("preview")}
            </button>
          </Link>

          {/* Meal Manager Button */}
          <Link href={`/meal-manager?restaurantId=${restaurantId}`}>
            <button
              className="
      px-2 py-1.5 sm:px-3 sm:py-2 sm:text-sm lg:text-lg 
      font-medium sm:font-semibold text-gray-700 hover:text-custom-red-4 
      transition-colors border-b-2 border-transparent hover:border-custom-red-4
      flex items-center gap-0.5 sm:gap-1
      whitespace-nowrap
    "
            >
              <span>
                <MealIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span className="">{EditorPage("meal")}</span>{" "}
              {EditorPage("manager")}
            </button>
          </Link>

          {/* Template Store Button */}
          <Link href={"/dashboard/templates"}>
            <button
              className="
        px-2 py-1.5 sm:px-3 sm:py-2 sm:text-sm lg:text-lg 
        font-medium sm:font-semibold text-gray-700 hover:text-custom-red-4 
        transition-colors border-b-2 border-transparent hover:border-custom-red-4
        flex items-center gap-0.5 sm:gap-1
        whitespace-nowrap
      "
            >
              <span>
                <TemplateIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span className="">{EditorPage("template")}</span>{" "}
              {EditorPage("store")}
            </button>
          </Link>
        </div>

        {/* Phone frame container */}

        <div className="flex justify-center">
          <div className="relative w-[385px] h-[717px] xl:w-[385px] xl:h-[760px]  border-[10px] border-black rounded-[40px] shadow-2xl overflow-hidden">
            {/* Phone notch - optional */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-10"></div>

            {/* Screen content */}

            <div className="absolute inset-0 bg-white overflow-y-auto">
              <iframe
                ref={iframeRef}
                className="w-full h-full"
                // src={`${frontendDomain}/menu/${params?.businessUrl || ""}?${
                //   isDemo ? "demo=true" : ""
                // }`}
                src={`${frontendDomain}/menu/${
                  params?.businessUrl || ""
                }?demo=true`}
                title="Live Preview"
              />
            </div>

            {/* Home button - optional */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </aside>

      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default EditorPage;
