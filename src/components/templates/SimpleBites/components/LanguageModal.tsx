// import { CloseIcon } from "@/utils/icons/CloseIcon";
// import React from "react";

// interface LanguageModalProps {
//   setLanguageModal: (value: boolean) => void;
//   // setSelectedLanguageDir: (value: string) => void;
//   setSelectedLanguage: ({
//     lang,
//     dir,
//     iconUrl,
//   }: {
//     lang: string;
//     dir: string;
//     iconUrl: string;
//   }) => void;
//   languages: {
//     lang: string;
//     dir: string;
//     iconUrl: string;
//   }[];

//   languageModalTemplate: {
//     backgroundColor: {color: string};
//     textColor: {color: string};
//   };
// }

// const LanguageModal = ({
//   setLanguageModal,
//   languages,
//   setSelectedLanguage,
//   languageModalTemplate
// }: // setSelectedLanguageDir,
// LanguageModalProps) => {
//   return (
//     <div
//       className="absolute top-0 left-0 w-full h-full"
//       style={{ backgroundColor: languageModalTemplate?.backgroundColor?.color }}
//     >
//       <div
//         onClick={() => setLanguageModal(false)}
//         className="size-12 absolute top-4 right-4"
//       >
//         <CloseIcon color="grey" />
//       </div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center leading-[3.5]">
//         {languages.map((language) => (
//           <div
//             key={language.lang}
//             onClick={() => {
//               setSelectedLanguage(language);
//               // setSelectedLanguageDir(language.dir);
//               setLanguageModal(false);
//             }}
//             className=""
//           >
//             <span className="text-xl" style={{color: languageModalTemplate?.textColor?.color}}>{language?.lang}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LanguageModal;

import { CloseIcon } from "@/utils/icons/CloseIcon";
import React, { useEffect } from "react";

interface LanguageModalProps {
  setLanguageModal: (value: boolean) => void;
  setSelectedLanguage: ({
    lang,
    dir,
    iconUrl,
  }: {
    lang: string;
    dir: string;
    iconUrl: string;
  }) => void;
  languages: {
    lang: string;
    dir: string;
    iconUrl: string;
  }[];
  languageModalTemplate: {
    backgroundColor: { color: string };
    textColor: { color: string };
  };
}

const LanguageModal = ({
  setLanguageModal,
  languages,
  setSelectedLanguage,
  languageModalTemplate,
}: LanguageModalProps) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: languageModalTemplate?.backgroundColor?.color }}
    >
      {/* Close button */}
      <button
        onClick={() => setLanguageModal(false)}
        className="fixed top-4 right-4 z-50 p-2 focus:outline-none size-14 xsm:size-16"
        aria-label="Close language modal"
      >
        <CloseIcon color="grey" />
      </button>

      {/* Language options */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          {languages.map((language) => (
            <button
              key={language.lang}
              onClick={() => {
                setSelectedLanguage(language);
                setLanguageModal(false);
              }}
              className="w-full py-4 hover:opacity-80 transition-opacity"
              style={{ color: languageModalTemplate?.textColor?.color }}
            >
              <span className="xsm:text-xl md:text-2xl">{language.lang}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
