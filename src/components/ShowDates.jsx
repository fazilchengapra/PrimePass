import { Separator } from "@radix-ui/themes";
import { useState } from "react";

const ShowDates = () => {
  const [selected, setSelected] = useState("2");

const options = [
    { value: "1", day: "MON", date: "07" },
    { value: "2", day: "THU", date: "08" },
    { value: "3", day: "FRI", date: "09" },
    { value: "4", day: "SAT", date: "10" },
];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-200 px-6 py-1 w-fit rounded-full">
        <h4 className="text-sm font-semibold">JUL</h4>
      </div>

      <div className="grid grid-cols-4 gap-3 w-fit">
        {options.map((option, index) => (
          <div className="flex flex-row gap-2 items-center">
            <button
              key={option.value}
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
            {index < options.length-1 && <Separator color="indigo" orientation="vertical" size='2'/>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDates;
