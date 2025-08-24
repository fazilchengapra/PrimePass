import { Separator } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ShowDates = ({ dates }) => {
  // Extract upcoming dates (flattened array with month info included)
  const dateArr = dates.flatMap((monthGroup) =>
    monthGroup.upcoming.map((item) => {
      const d = new Date(item.date);
      return {
        value: item.date, // YYYY-MM-DD
        day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(), // MON, TUE
        date: d.getDate().toString().padStart(2, "0"), // 01, 02
        month: monthGroup.month, // use API month (AUG, SEP)
      };
    })
  );

  const dispatch = useDispatch();

  // default selected = first available date
  const [selected, setSelected] = useState(dateArr[0]?.value || null);

  useEffect(() => {
    dispatch({ type: "show/setSltDate", payload: selected });
  }, [selected, dispatch]);

  return (
    <div className="flex flex-col gap-6">
      {/* Group by month */}
      {dates.map((monthGroup, idx) => {
        const monthDates = dateArr.filter((d) => d.month === monthGroup.month);

        return (
          <div key={idx} className="flex flex-col gap-4">
            {/* Month header */}
            <div className="bg-gray-200 px-6 py-1 w-fit rounded-full">
              <h4 className="text-sm font-semibold">{monthGroup.month}</h4>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-4 gap-3 w-fit">
              {monthDates.map((option, index) => (
                <div
                  className="flex flex-row gap-2 items-center"
                  key={option.value}
                >
                  <button
                    onClick={() => setSelected(option.value)}
                    className={`p-3 rounded-xl text-center w-20 h-35 transition-colors duration-200
                      ${
                        selected === option.value
                          ? "bg-black text-white"
                          : "text-black"
                      }
                      focus:outline-none`}
                  >
                    <div className="text-xs font-bold">{option.day}</div>
                    <div className="text-sm font-bold">{option.date}</div>
                  </button>
                  {index < monthDates.length - 1 && (
                    <Separator color="indigo" orientation="vertical" size="2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowDates;
