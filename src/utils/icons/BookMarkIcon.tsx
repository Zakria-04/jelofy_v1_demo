import React from "react";

const BookMarkIcon = ({
  size,
  color,
  shape,
}: {
  size: string;
  color: string;
  shape: "outline" | "fill";
}) => {
  return (
    <div>
      {shape === "fill" && (
        <svg
          height={size}
          viewBox="0 0 48 48"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
        >
          <path d="M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}

      {shape === "outline" && (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          height={size}
          width={size}
          fill={color}
        >
          <g data-name="1" id="_1">
            <path d="M393,450a14.92,14.92,0,0,1-7.46-2L257,374.29,128.46,448A15,15,0,0,1,106,435V63a15,15,0,0,1,15-15H393a15,15,0,0,1,15,15V435a15,15,0,0,1-15,15ZM257,342a14.92,14.92,0,0,1,7.46,2L378,409.1V78H136V409.1L249.54,344A14.92,14.92,0,0,1,257,342Z" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default BookMarkIcon;
