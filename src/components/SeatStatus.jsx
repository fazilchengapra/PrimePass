
const SeatStatus = () => {
  const seatCss = [
    { css: "bg-gray-200 cursor-pointer", label: "Available" },
    { css: "bg-gray-50 text-gray-400 cursor-not-allowed", label: "Booked" },
    { css: "bg-blue-500 text-white cursor-pointer", label: "Selected" },
  ];
  return (
    <div className="flex justify-center mt-3 gap-2">
      {seatCss.map((seat) => (
        <div className="flex flex-col items-center gap-3" key={seat.label}>
          <div className="flex flex-row gap-2">
            <div
              className={`w-8 h-8 min-w-[2rem] border rounded-md flex items-center justify-center text-xs ${seat.css}`}
            >
              A1
            </div>
          </div>
          <p className="text-xs">{seat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SeatStatus;
