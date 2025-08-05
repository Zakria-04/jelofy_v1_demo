import React from "react";

const PhoneFrame = () => {
  return (
    <div className="w-[350px] h-[700px] overflow-hidden relative">
      <iframe
        src="http://localhost:3000/store/burger-shark"
        className="absolute top-0 left-0 w-full h-full border-0"
        style={{
          pointerEvents: "none",
        }}
        scrolling="no"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default PhoneFrame;
