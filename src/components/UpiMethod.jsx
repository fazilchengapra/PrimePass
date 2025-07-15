import { Button, DropdownMenu, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const paymentOptions = [
  {
    name: "Google Pay",
    image:
      "https://www.svgrepo.com/show/303357/google-pay-primary-logo-logo.svg",
    upiHandles: ["@oksbi", "@okaxis", "@okhdfcbank", "@okicici", "@okyesbank"],
    class: "w-8 h-8",
  },
  {
    name: "PhonePe",
    image:
      "https://cdn.iconscout.com/icon/free/png-512/free-phonepe-logo-icon-download-in-svg-png-gif-file-formats--payment-app-application-indian-companies-pack-logos-icons-2249157.png?f=webp&w=512",
    upiHandles: ["@ybl", "@ibl"],
    class: "w-16 h-auto",
  },
  {
    name: "Paytm",
    image:
      "https://cdn.iconscout.com/icon/free/png-512/free-paytm-logo-icon-download-in-svg-png-gif-file-formats--online-payment-brand-logos-pack-icons-226448.png?f=webp&w=512",
    upiHandles: ["@paytm"],
    class: "w-8 h-8",
  },
];

const UpiMethod = () => {
  const [option, setOption] = useState({
    name: "Google Pay",
    image:
      "https://www.svgrepo.com/show/303357/google-pay-primary-logo-logo.svg",
    upiHandles: ["@oksbi", "@okaxis", "@okhdfcbank", "@okicici", "@okyesbank"],
    class: "w-8 h-8",
  });
  const [options, setOptions] = useState([]);
  const [handle, setHandle] = useState(option?.upiHandles[0]);
  const [handles, setHandles] = useState([]);

  useEffect(() => {
    setOptions(paymentOptions.filter((app) => app.name !== option.name));
    setHandles(option.upiHandles.filter((each) => each !== handle));
  }, [option, handle]);

  useEffect(() => {
    setHandle(option?.upiHandles[0]);
  }, [option]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="text-xs">
            <p>Select your UPI app</p>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button color="gray" variant="outline" className="w-full">
                <div className="flex flex-row justify-between items-center w-full text-start">
                  <img
                    alt={option.name}
                    class={`object-fill ${option.class}`}
                    src={option.image}
                  />
                  <IoIosArrowDown />
                </div>
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="w-full flex flex-col gap-2 items-center">
              {options.map((method) => (
                <DropdownMenu.Item
                  onClick={() => setOption(method)}
                  key={method.name}
                  className="flex w-auto flex-row justify-between m-auto focus:bg-gray-100 hover:bg-gray-100 outline-none"
                >
                  <img
                    alt={method.name}
                    className={`object-fill ${method.class}`}
                    src={method.image}
                  />
                </DropdownMenu.Item>
              ))}
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
                      <span>{handle}</span>
                      {handles.length > 1 && <IoIosArrowDown />}
                    </div>
                  </Button>
                </DropdownMenu.Trigger>

                {handles.length > 1 && (
                  <DropdownMenu.Content>
                    {handles.map((handle) => (
                      <DropdownMenu.Item onClick={() => setHandle(handle)}>
                        <span>{handle}</span>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                )}
              </DropdownMenu.Root>
            </div>
          </div>
        </div>

        {/* verify button */}
        <div className="w-full">
          <Button className="w-full" color="green" variant="solid">
            Verify & Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpiMethod;
