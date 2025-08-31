import { Button, IconButton } from "@radix-ui/themes";
import { DropdownMenu } from "@radix-ui/themes";
import { CgOptions } from "react-icons/cg";
import { MdLiveTv } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearTool, setTool } from "../app/searchSlice";

const tools = [
  { name: "series", icon: <MdLiveTv size={15} />, dis: "web series" },
];

const SearchTools = ({ setFilter }) => {
  const [tool, setTools] = useState([]); // keep array
  const dispatch = useDispatch();

  const addTool = (item) => {
    if (!tool.some((t) => t.name === item.name)) {
      setTools([...tool, item]);
      setFilter(item.name);
      dispatch(setTool(item.name));
    }
  };

  const removeTool = (name) => {
    setTools(tool.filter((t) => t.name !== name));
    setFilter("");
    dispatch(clearTool());
  };

  useEffect(() => {
    setFilter(null);
  }, [setFilter, dispatch]);

  return (
    <div className="flex flex-row gap-4 items-center overflow-x-auto pb-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton
            color="gray"
            variant="outline"
            className="w-14 flex items-center justify-center rounded-full"
          >
            <CgOptions size={20} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {tools.map((item) => (
            <DropdownMenu.Item key={item.name} onClick={() => addTool(item)}>
              <div className="flex flex-row gap-2 text-sm items-center">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {tool.map((e) => (
        <div key={e.name} className="flex flex-row items-center">
          <Button
            onClick={() => removeTool(e.name)}
            variant="soft"
            className="w-fit px-2 flex items-center gap-1 rounded-full"
          >
            {e.icon}
            <span className="text-sm">{e.name}</span>
            <IoIosClose size={20} className="cursor-pointer" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SearchTools;
