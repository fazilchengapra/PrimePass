import { FaLock } from "react-icons/fa";
import { Button } from "@radix-ui/themes";
import { useSearchParams } from "react-router-dom";

const cardsIMG = [
  { name: "Visa", url: "/asset/Visa.svg" },
  { name: "Amex", url: "/asset/Amex.svg" },
  { name: "Mastercard", url: "/asset/Mastercard.svg" },
  { name: "Discover", url: "/asset/Discover.svg" },
];

const CardMethod = () => {
  const [searchParams] = useSearchParams();
  const count = searchParams.get("count")
  
  
  return (
    <div className="w-full h-fit">
      <div className="w-full flex flex-col gap-3">
        <div className="grid grid-cols-4 gap-1">
          {cardsIMG.map((card) => (
            <div key={card.name}>
              <img src={card.url} alt="Visa" className="h-12 object-cover" />
            </div>
          ))}
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-2">
          <div className="text-md font-semibold lg:font-normal">
            <h4>Payment Amount</h4>
          </div>
          <div className="text-lg font-bold lg:font-semibold">
            <h3>{(110 * count * 1.18).toFixed(2)}</h3>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Name of Card</label>
            <input
              type="text"
              className="w-full border border-gray-300 text-sm text-gray-700 focus:outline-blue-500 px-4 py-2 rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Card Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 text-sm text-gray-700 focus:outline-blue-500 px-4 py-2 rounded-md"
            />
          </div>

          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="MM / YY"
              className="w-1/2 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 border-r border-gray-300 focus:outline-none"
            />
            <input
              type="text"
              placeholder="CVC"
              className="w-1/2 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Button */}
        <div className="w-full">
          <Button color="green" className="py-4 w-full text-sm font-bold">
            <FaLock />
            {(110 * count * 1.18).toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardMethod;
