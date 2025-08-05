import React from "react";

const PlusIcon = ({ size, color }: { size: string; color: string }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="3"
    >
      <defs></defs>
      <title />
      <g id="plus">
        <line className="cls-1" x1="16" x2="16" y1="7" y2="25" />
        <line className="cls-1" x1="7" x2="25" y1="16" y2="16" />
      </g>
    </svg>
  );
};

export default PlusIcon;
