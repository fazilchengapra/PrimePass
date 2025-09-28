import { Button, TextField } from "@radix-ui/themes";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../schemas/authSchema";
import { CgDanger } from "react-icons/cg";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const user = useSelector((state) => state.user);
  if (user?.isAuthenticated) {
    navigate("/");
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const { userName, email, password } = data;
      const res = await registerUser(userName, email, password);
      toast.success(res.message);
      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.log("registration failed ", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-full ">
      <div className="w-[90%] lg:w-1/2 pb-10 shadow-md rounded-md bg-white flex flex-col gap-5 m-auto justify-center items-center mt-5">
        <div className="div text-2xl text-center mt-10 font-bold text-gray-900">
          {" "}
          <h3>Sign Up</h3>
        </div>
        <div className="w-2/3 lg:w-1/3 m-auto flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            {errors?.userName && (
              <div className=" items-center gap-1 text-red-500 text-xs inline-flex">
                <CgDanger size={12} />
                <p>{errors.userName.message}</p>
              </div>
            )}

            <TextField.Root
              {...register("username")}
              size="3"
              placeholder="Enter username"
              type="text"
            >
              <TextField.Slot>
                <FaUserCircle height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </div>

          <div className="flex flex-col gap-1">
            {errors.email && (
              <div className="flex items-center gap-1 text-red-500 text-xs">
                <CgDanger size={12} />
                <p>{errors.email.message}</p>
              </div>
            )}
            <TextField.Root
              size="3"
              placeholder="Enter email"
              type="email"
              {...register("email")}
            >
              <TextField.Slot>
                <MdOutlineMail height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </div>

          <div className="flex flex-col gap-1">
            {errors?.password && (
              <div className="flex items-center gap-1 text-red-500 text-xs">
                <CgDanger size={12} />
                <p>{errors.password.message}</p>
              </div>
            )}
            <TextField.Root
              size="3"
              placeholder="Enter Password"
              type="password"
              {...register("password")}
            >
              <TextField.Slot>
                <IoIosLock height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </div>

          <div className="mt-5">
            <Button loading={loading} className="w-full py-5" onClick={handleSubmit(onSubmit)}>
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
