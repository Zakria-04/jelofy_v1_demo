import React from "react";

const TemplateHeader = () => {
  return (
    <header>
      <input
        className="w-full p-3 border rounded outline-none"
        type="search"
        placeholder="search your favorite templates..."
      />
    </header>
  );
};

export default TemplateHeader;
