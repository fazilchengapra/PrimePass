import { Button, IconButton, TextField } from "@radix-ui/themes";
import { AlertDialog } from "radix-ui";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";

const input = [
  { name: "email", label: "Email", placeholder: "Enter your Email" },
  { name: "password", label: "Password", placeholder: "Enter your Password" },
];

const SignIN = () => {
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(mail, pass);
      setMessage("Login successful!");
      console.log("User:", res.user);
      // navigate to dashboard or home
    } catch (err) {
      setMessage(err.message || "Error logging in.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 m-0 p-2">
      <div className="flex flex-row justify-end m-0 p-0">
        <AlertDialog.Cancel>
          <div className="w-fit">
            <Button variant="soft" className=" rounded-full py-2 px-2">
              <IoMdClose size="15" />
            </Button>
          </div>
        </AlertDialog.Cancel>
      </div>
      <div className="flex flex-col gap-3 w-fit m-auto text-center">
        <div className="text-xl">
          <h3 className="font-bold">Sign In</h3>
        </div>
        <div className="text-sm">
          <span className=" text-gray-400">
            Welcome back! Please enter your details.
          </span>
          {message && <p>{message}</p>}
        </div>
      </div>

      {/* Form */}
      <div className="w-full lg:w-4/6 flex flex-col gap-3 m-auto">
        {input.map((e) => (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400 font-bold lg:font-semibold">
              {e.label}
            </label>
            <TextField.Root
              value={e.name === "email" ? mail : pass}
              type={e.name === "password" && (showPass ? "text" : "password")}
              onChange={(event) =>
                e.name === "email"
                  ? setMail(event.target.value)
                  : setPass(event.target.value)
              }
              radius="large"
              placeholder={e.placeholder}
              className="px-2"
            >
              {e.name === "password" && (
                <TextField.Slot className="end-0" side="right">
                  <IconButton
                    size="1"
                    variant="ghost"
                    className="text-black"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <FaEyeSlash height="16" width="16" />
                    ) : (
                      <IoMdEye height="16" width="16" />
                    )}
                  </IconButton>
                </TextField.Slot>
              )}
            </TextField.Root>
          </div>
        ))}
        <div className="w-full mt-3">
          <Button className="w-full" onClick={handleLogin}>
            Sign In
          </Button>
        </div>
        <div className="flex flex-row gap-1 text-xs text-center w-full justify-center mt-1">
          <span>Don't have an account?</span>

          <AlertDialog.Cancel asChild>
            <Link to="/register" className="text-black font-bold text-xs">
              Sign Up
            </Link>
          </AlertDialog.Cancel>
        </div>
      </div>
    </div>
  );
};

export default SignIN;
