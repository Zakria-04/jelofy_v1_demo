"use client";
import { AppDispatch } from "@/store/store";
import { getProductDetailsAPI } from "@/store/store/storeThunks";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
interface ProductDetailsProps {
  restaurantSlug: string;
  productId: string;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [TemplateDetails, setTemplateDetails] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await dispatch(getProductDetailsAPI(productId));
        if (!product) {
          throw new Error("Product not found");
        }

        const templateName = product.payload.selectedTemplate;

        // Dynamically import the selected template
        const DynamicComponent = dynamic(
          () => import(`@/components/templates/${templateName}/Details`),
          { ssr: false }
        );

        // TypeScript expects React.ComponentType for dynamic imports
        setTemplateDetails(() => DynamicComponent as React.ComponentType);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId, dispatch]);

  return (
    <div>
      {TemplateDetails ? <TemplateDetails /> : <h1>Loading Product...</h1>}
    </div>
  );
};

export default ProductDetails;
