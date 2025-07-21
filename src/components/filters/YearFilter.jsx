import { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const YearFilter = ({ filterOptions, setFilterOptions, parentFilterOptions }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(parentFilterOptions?.year || null);
  const [page, setPage] = useState(0); // Each page shows 6 years

  const yearsPerPage = 6;

  const getYears = () => {
    const years = [];
    const start = currentYear - page * yearsPerPage;

    for (let i = 0; i < yearsPerPage; i++) {
      const year = start - i;
      if (year > 1900) years.push(year); // adjust this range if needed
    }

    return years;
  };

  const handleNext = () => {
    const nextStart = currentYear - (page + 1) * yearsPerPage;
    if (nextStart - yearsPerPage + 1 > 1900) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="w-fit m-auto flex flex-col gap-3">
      <label className="text-sm text-center text-gray-700 font-bold">
        Select Year
      </label>

      <div className="flex justify-between items-center mb-2">
        <button
          onClick={handlePrev}
          className="px-2 py-2 text-sm bg-gray-200 rounded-full disabled:opacity-50"
          disabled={page === 0}
        >
          <LuArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="px-2 py-2 rounded-full text-sm bg-gray-200"
        >
          <LuArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {getYears().map((year) => (
          <div
            key={year}
            className={`px-3 py-2 text-center rounded cursor-pointer text-sm
              ${
                selectedYear === year
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            onClick={() => {
              setSelectedYear(year);
              setFilterOptions((prev) => ({ ...prev, year }));
            }}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearFilter;
