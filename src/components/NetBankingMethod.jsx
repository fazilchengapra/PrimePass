import { Button } from "@radix-ui/themes";
import { useState } from "react";

const Banks = [
  {
    name: "SBI",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/State-Bank-of-India-Logo.svg",
  },
  {
    name: "Citi",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/73/Citi_logo_March_2023.svg",
  },
  {
    name: "HDFC",
    url: "https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1720244492",
  },
  {
    name: "ICICI",
    url: "https://companieslogo.com/img/orig/IBN-af38b5c0.png?t=1720244492",
  },

  {
    name: "Kotak",
    url: "https://companieslogo.com/img/orig/KOTAKBANK.NS-36440c5e.png?t=1720244492",
  },

  {
    name: "Axis",
    url: "https://companieslogo.com/img/orig/AXISBANK.BO-8f59e95b.png?t=1720244490",
  },
];

const NetBankingMethod = () => {
    const [bank, setBank] =useState(null)
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4 items-center">
          {Banks.map((bankData) => (
            <div
              key={bankData.name}
              className={`text-center border p-3 rounded-md cursor-pointer ${bank === bankData.name && 'border-blue-500 border-2'}`}
              onClick={() => setBank(bankData.name)}
            >
              <img
                className="lg:w-12 w-6 lg:h-12 h-6 object-contain mx-auto mb-3"
                src={bankData.url}
                alt={bankData.name}
              />
              <span className="text-sm lg:text-base lg:font-semibold font-bold">
                {bankData.name}
              </span>
            </div>
          ))}
        </div>
        <div>
          <Button color="green" disabled={bank === null} className="w-full font-bold py-6 flex flex-row gap-2 items-center">
            <span>Pay</span>
            <span>₹128</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NetBankingMethod;
