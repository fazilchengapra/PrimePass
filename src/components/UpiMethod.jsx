import { Button, DropdownMenu, TextField } from "@radix-ui/themes";
import { IoIosArrowDown } from "react-icons/io";

import React from "react";

const UpiMethod = () => {
  return (
    <div className="w-full h-fit">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-xs">
            <p>Select your UPI app</p>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button color="gray" variant="outline" className="w-full">
                <div className="flex flex-row justify-between items-center w-full text-start">
                  <img
                    alt="upi"
                    class="object-fill h-8 w-8"
                    src="https://www.svgrepo.com/show/303357/google-pay-primary-logo-logo.svg"
                  />
                  <IoIosArrowDown />
                </div>
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="w-full flex flex-col items-center">
              <DropdownMenu.Item className="flex flex-row justify-between w-fit m-auto focus:bg-gray-100 hover:bg-gray-100 outline-none">
                <img
                  alt="upi"
                  className="object-fill w-16 h-auto"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-phonepe-logo-icon-download-in-svg-png-gif-file-formats--payment-app-application-indian-companies-pack-logos-icons-2249157.png?f=webp&w=512"
                />
              </DropdownMenu.Item>

              <DropdownMenu.Item className="w-full data-[highlighted]:bg-gray-200 data-[highlighted]:text-black outline-none">
                <img
                  alt="upi"
                  className="object-fill w-8 h-8 m-auto"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-paytm-logo-icon-download-in-svg-png-gif-file-formats--online-payment-brand-logos-pack-icons-226448.png?f=webp&w=512"
                />
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        <div>
          <div className="flex flex-row w-full gap-1">
            <TextField.Root
              placeholder="Enter your UPI ID"
              className="w-full"
            />
            <div className="w-fit">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="w-fit">
                  <Button color="gray" variant="outline" className="w-fit">
                    <div className="flex flex-row gap-1 items-center w-fit text-start">
                      <span>@okaysbi</span>
                      <IoIosArrowDown />
                    </div>
                  </Button>
                </DropdownMenu.Trigger>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>

        {/* verify button */}
        <div className="w-full">
          <Button className="w-full" color="green" variant="solid">Verify & Pay</Button>
        </div>
      </div>
    </div>
  );
};

export default UpiMethod;
