import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";

const AuthForm = ({
  isLogin,
  fields,
  register,
  errors,
  onSubmit,
  isLoading,
  buttonText,
  formData,
  setFormData,
}) => (
  <div className="w-full flex flex-col gap-3">
    {fields.map((field) => (
      <div key={field.label} className="flex flex-col gap-1">
        <label
          htmlFor={field.label}
          className="capitalize text-sm text-[#414651]"
        >
          {field.label}
        </label>
        <TextField.Root
          {...register(field.label)}
          value={formData[field.label]}
          onChange={(e) =>
            setFormData({ ...formData, [field.label]: e.target.value })
          }
          type={field.type}
          id={field.label}
          size="2"
          placeholder={field.placeh}
          className="py-2"
        />
        {errors?.[field.label]?.message && (
          <div className="flex flex-row items-center gap-1 text-red-500 text-xs">
            <CgDanger />
            {errors?.[field.label]?.message}
          </div>
        )}
      </div>
    ))}

    {isLogin && (
      <div className="text-right text-sm text-[#6941C6] font-semibold">
        <Link to={"/forgot-password"}>Forgot password</Link>
      </div>
    )}

    <Button
      className="bg-black rounded-lg text-white cursor-pointer"
      onClick={onSubmit}
      loading={isLoading}
    >
      {buttonText}
    </Button>
  </div>
);

export default AuthForm;
