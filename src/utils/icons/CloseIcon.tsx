import React from "react";

export const CloseIcon = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      // className="text-custom-white-1"
      viewBox="0 0 24 24"
      // stroke="currentColor"
      stroke={color}
      className="transition-opacity duration-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
