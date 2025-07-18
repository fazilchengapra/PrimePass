import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import UpiMethod from "./UpiMethod";
import { AnimatePresence, motion } from "framer-motion";
import CardMethod from "./CardMethod";
import NetBankingMethod from "./NetBankingMethod";

const paymentMethods = [
  { name: "UPI", content: <UpiMethod /> },
  { name: "Credit/Debit Card", content: <CardMethod /> },
  { name: "Netbanking", content: <NetBankingMethod /> },
];

const PaymentMethods = ({ amount }) => {
  const [method, setMethod] = useState(null);

  const handleClick = (name) => {
    setMethod((prev) => (prev === name ? null : name));
  };

  return (
    <div className="w-full h-fit mt-5">
      <div className="flex flex-col gap-4">
        {paymentMethods.map((payMethod) => {
          const isOpen = payMethod.name === method;
          return (
            <div
              key={payMethod.name}
              className="flex flex-col border rounded-lg p-3 transition-all duration-300"
            >
              <div
                className="flex flex-row justify-between items-center cursor-pointer"
                onClick={() => handleClick(payMethod.name)}
              >
                <h3 className="text-base lg:text-lg font-bold">
                  {payMethod.name}
                </h3>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IoIosArrowDown size={20} />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    {payMethod.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethods;
