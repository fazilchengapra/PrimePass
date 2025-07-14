import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import UpiMethod from "./UpiMethod";

const paymentMethods = [
  { name: "UPI", content: <UpiMethod /> },
  { name: "Credit/Debit Card" },
  { name: "Wallet" },
  { name: "Netbanking" },
];

const PaymentMethods = () => {
  return (
    <div className="w-full h-fit mt-5">
      <div className="flex flex-col gap-4">
        {paymentMethods.map((method) => (
          <div className="flex flex-col gap-4 lg:p-4 border rounded-lg p-3">
            <div className="flex flex-row justify-between items-center">
              <div className="text-normal lg:text-lg font-bold">
                <h3>{method.name}</h3>
              </div>
              <div>
                <IoIosArrowDown size={20} />
              </div>
            </div>
            {method?.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
