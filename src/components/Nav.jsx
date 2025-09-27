import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Avatar,
  Button,
  DropdownMenu,
  Select,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getCities } from "../api/citiesList";
import { Link } from "react-router-dom";
import SearchDialog from "./SearchDialog";
import SignIN from "./SignIN";

// ✅ Redux
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../app/userSlice";
import { isMe, logOut } from "../services/authService";
import { toast } from "react-toastify";
import { clearTool } from "../app/searchSlice";

const Nav = () => {
  const [state, setState] = useState();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // ✅ Fetch cities
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

  // ✅ Fetch user info (isMe)
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await isMe();

        if (res.loggedIn) {
          dispatch(setUser(res.user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        console.log("Error checking user:", error);
        dispatch(clearUser());
      }
    };
    if (!user.isAuthenticated) checkUser();
    return;
  }, [dispatch, user]);

  useEffect(() => {
    if (!searchOpen) dispatch(clearTool());
  }, [searchOpen, dispatch]);

  const handleLogOut = async () => {
    try {
      const res = await logOut();
      if (!res.success) return toast.error("Failed Logout");
      dispatch(clearUser());
      toast.success("Logout Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center p-2 bg-white border-b !w-full h-auto">
      {/* Left: Logo + Search */}
      <div className="flex-row gap-2 lg:gap-4 lg:grid lg:grid-cols-6 items-center">
        <Link to={"/"}>
          <div className="w-20 h-20 overflow-hidden">
            <img
              src="/asset/primePassLogo.png"
              alt="Prime Pass Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        {/* open only desktop */}
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
            onClose={() => dispatch(clearTool())}
          />
        </div>
      </div>

      {/* Right: State Select + Auth */}
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

        {/* ✅ If user NOT logged in → Show Sign In */}
        {!user.isAuthenticated ? (
          <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger>
              <Button className="bg-black">Sign In</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Title className="hidden">
                Sign In Form
              </AlertDialog.Title>
              <AlertDialog.Description className="hidden">
                for login users
              </AlertDialog.Description>
              <SignIN closeDialog={() => setOpen(false)} />
            </AlertDialog.Content>
          </AlertDialog.Root>
        ) : (
          // ✅ If logged in → Show Avatar & Menu
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <div>
                <Avatar
                  fallback={user.username[0]?.toUpperCase()}
                  radius="full"
                />
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item disabled>
                {user.username} ({user.role})
              </DropdownMenu.Item>
              <Link to={"/user/booking-history"}>
                <DropdownMenu.Item>Booking Details</DropdownMenu.Item>
              </Link>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                className="text-red-600 hover:bg-red-600 hover:text-white"
                onClick={handleLogOut}
              >
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}

        <SearchDialog
          trigger={
            <HamburgerMenuIcon className="size-6 mx-4 block lg:hidden" />
          }
          contentClass="w-3/4"
          dialogClass="top-[18rem]"
          openChanges={setSearchOpen}
          onClose={() => dispatch(clearTool())}
        />
      </div>
    </div>
  );
};

export default Nav;
