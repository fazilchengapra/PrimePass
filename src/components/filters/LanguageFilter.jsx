import { Button } from "@radix-ui/themes";
import React, { useState } from "react";
import { MdDone } from "react-icons/md";

const languages = [
  { code: "en", name: "English" },
  { code: "ko", name: "Korean" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
];

const LanguageFilter = ({ filterOptions, setFilterOptions, parentFilterOptions }) => {
  const [selectedLang, setSelectedLang] = useState(() => {
    const match = languages.find(
      (lang) => lang.code === parentFilterOptions?.with_original_language
    );
    return match ? match.name : null;
  });

  return (
    <div className="w-full px-2 h-fit">
      <div className="flex flex-col gap-4">
        <div className="text-sm text-black font-bold text-center">
          <h3>Select Language</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((language) => (
            <Button
              onClick={() => {
                setSelectedLang(language.name);
                setFilterOptions((prev) => ({
                  ...prev,
                  with_original_language: language.code,
                }));
              }}
              color={filterOptions?.with_original_language === language.code ? "blue" : "gray"}
              variant={filterOptions?.with_original_language === language.code ? "soft" : "outline"}
              className="py-1 rounded-md flex flex-row justify-between px-2 gap-2 text-sm"
              highContrast
            >
              {language.name}
              {filterOptions?.with_original_language === language.code && <MdDone />}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageFilter;
