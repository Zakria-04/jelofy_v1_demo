"use client";
import { useParams } from "next/navigation";
import React from "react";
import QRMenuService from "./QRMenuService";
import PaymentOrdersProcessService from "./PaymentOrdersProcessService";

const ServiceSlug = () => {
  const params = useParams();
  const serviceSlug = params.serviceSlug as string;

  if (!ServiceSlug) {
    return <div>No service slug provided</div>;
  }

  if (serviceSlug === "qr-menu") return <QRMenuService />;
  if (serviceSlug === "payment-orders-process")
    return <PaymentOrdersProcessService />;
  return <div className="text text-5xl text-center">404. Service not found</div>;
};

export default ServiceSlug;
