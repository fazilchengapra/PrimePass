import { Separator } from "@radix-ui/themes";
import { useState } from "react";

const ShowDates = ({ dates }) => {
  // default selected = first date if available
  const [selected, setSelected] = useState(dates?.[0] || null);

  const formatDates = (dates) => {
    return dates.map((dateStr) => {
      const d = new Date(dateStr);
      return {
        value: dateStr, // raw YYYY-MM-DD
        day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(), // FRI, SAT
        date: d.getDate().toString().padStart(2, "0"), // 08, 09, etc.
        month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(), // JAN, FEB
      };
    });
  };

  const dateArr = formatDates(dates);

  return (
    <div className="flex flex-col gap-4">
      {/* Month header from first selected date */}
      {dateArr.length > 0 && (
        <div className="bg-gray-200 px-6 py-1 w-fit rounded-full">
          <h4 className="text-sm font-semibold">{dateArr[0].month}</h4>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 w-fit">
        {dateArr.map((option, index) => (
          <div className="flex flex-row gap-2 items-center" key={option.value}>
            <button
              onClick={() => setSelected(option.value)}
              className={`p-3 rounded-xl text-center w-20 h-35 transition-colors duration-200
                ${
                  selected === option.value
                    ? "bg-black text-white"
                    : " text-black"
                }
                focus:outline-none`}
            >
              <div className="text-xs font-bold">{option.day}</div>
              <div className="text-sm font-bold">{option.date}</div>
            </button>
            {index < dateArr.length - 1 && (
              <Separator color="indigo" orientation="vertical" size="2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDates;
