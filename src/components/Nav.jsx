import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Select, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getCities } from "../api/citiesList";
import { Link } from "react-router-dom";
import SearchDialog from "./SearchDialog";
import SignIN from "./SignIN";

const Nav = () => {
  const [state, setState] = useState();
  const [open, setOpen] = useState(false);

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
    <div className="flex justify-between items-center p-2 bg-white border-b !w-full h-auto">
      <div className="flex-row gap-2 lg:gap-4 lg:grid lg:grid-cols-6 items-center">
        <Link to={"/"}>
          <div className="text-lg font-bold w-auto p-2 lg:col-span-1">
            PrimePass
          </div>
        </Link>
        <div className="h-10 w-auto col-span-5 mt-2 hidden lg:block">
          <SearchDialog
            trigger={
              <div>
                <TextField.Root placeholder="Search Movies...">
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            }
            contentClass="w-1/2"
          />
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

        <AlertDialog.Root open={open} onOpenChange={setOpen}>
          <AlertDialog.Trigger>
            <Button className="bg-black">Sign In</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title className="hidden">Sign In Form</AlertDialog.Title>
            <AlertDialog.Description className="hidden">for login users</AlertDialog.Description>
            <SignIN closeDialog={() => setOpen(false)}/>
          </AlertDialog.Content>
        </AlertDialog.Root>

        <SearchDialog
          trigger={
            <HamburgerMenuIcon className="size-6 mx-4 block lg:hidden" />
          }
          contentClass="w-3/4"
          dialogClass="top-[18rem]"
        />
      </div>
    </div>
  );
};

export default Nav;
