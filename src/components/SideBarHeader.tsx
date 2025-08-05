import { CloseIcon } from "@/utils/icons/CloseIcon";
import { MenuIcon } from "@/utils/icons/MenuIcon";
import { logoName } from "@/utils/utils";
import React from "react";

interface SideBarHeaderProps {
  list: string;
  isSideBarOpen: boolean;
  setIsSideBarOpen: (value: boolean) => void;
}

const SideBarHeader = ({
  isSideBarOpen,
  setIsSideBarOpen,
}: SideBarHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-4 xl:hidden">
      <h2 className="text-3xl first-letter:text-custom-red-1 text-gray-800 font-bold tracking-wide">
        {logoName}
      </h2>
      {/* <h2 className="text-2xl text-custom-black2 md:text-3xl">{list}</h2> */}
      <button
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        className="size-12 md:size-20 transition-all duration-300 ease-in-out"
        aria-label={isSideBarOpen ? "Close menu" : "Open menu"}
      >
        {isSideBarOpen ? (
          <CloseIcon color="#374151" />
        ) : (
          <MenuIcon size="3rem" color="#374151" />
        )}
      </button>
    </div>
  );
};

export default SideBarHeader;
