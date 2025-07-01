import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu, TextField } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 w-full h-auto">
      <div className="flex-row gap-4 grid grid-cols-6 items-center">
        <div className="text-lg font-bold w-auto p-2 col-span-1">PrimePass</div>
        <div className="h-10 w-full col-span-5 mt-2">
          <TextField.Root placeholder="Search the docs…">
            <TextField.Slot>
              <MagnifyingGlassIcon className="h-6" />
            </TextField.Slot>
          </TextField.Root>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button color="#e5e7eb" variant="soft">
                Options
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
              <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                  <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>

              <DropdownMenu.Separator />
              <DropdownMenu.Item>Share</DropdownMenu.Item>
              <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        <Button variant="classic">Sign In</Button>
        <HamburgerMenuIcon className="size-6"/>
      </div>
    </div>
  );
};

export default Nav;
