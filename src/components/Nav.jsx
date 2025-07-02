import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Select, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getCities } from "../api/citiesList";

const Nav = () => {

  const [state, setState] = useState();

  useEffect(() => {
    const citiesList = async () => {
      try {
        const res = await getCities();
        setState(res.data.data);
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    };
    citiesList();
  }, []);
  

  return (
    <div className="flex justify-between items-center p-2 bg-white border-b w-full h-auto">
      <div className="flex-row gap-2 lg:gap-4 lg:grid lg:grid-cols-6 items-center">
        <div className="text-lg font-bold w-auto p-2 col-span-1">PrimePass</div>
        <div className="h-10 w-full col-span-5 mt-2 hidden lg:block">
          <TextField.Root placeholder="Search the docs…">
            <TextField.Slot>
              <MagnifyingGlassIcon className="h-6" />
            </TextField.Slot>
          </TextField.Root>
        </div>
      </div>

      <div className="flex flex-row gap-4 lg:gap-8 items-center">
        <div className="hidden lg:block">
          <Select.Root defaultValue="select">
            <Select.Trigger />
            <Select.Content className="h-72 overflow-y-auto">
              <Select.Group>
                <Select.Label>Select State</Select.Label>
                <Select.Item value="select">--Select--</Select.Item>
                {state?.states?.map((e) => (
                  <Select.Item key={e.name} value={e.name}>
                    {e.name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>

        <Button className="bg-black">Sign In</Button>
        <HamburgerMenuIcon className="size-6 block lg:hidden" />
      </div>
    </div>
  );
};

export default Nav;
