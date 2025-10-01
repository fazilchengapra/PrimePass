import { loginSchema, registerSchema } from "../schemas/authSchema";

export const AuthFormConstant = {
  login: {
    title: "login in to your account",
    disc: "Welcome back! Please enter your details.",
    buttonText: "Sign In",
    schema: loginSchema,
    field: [
      {
        label: "email",
        type: "email",
        placeh: "Enter your email.",
      },
      {
        label: "password",
        type: "password",
        placeh: "Enter your password.",
      },
    ],
  },
  register: {
    title: "Create an account",
    disc: "Join us today! Please fill in your information.",
    buttonText: "Get started",
    schema: registerSchema,
    field: [
      {
        label: "username",
        type: "text",
        placeh: "Enter your name.",
      },
      {
        label: "email",
        type: "email",
        placeh: "Enter your email.",
      },
      {
        label: "password",
        type: "password",
        placeh: "Create a password",
      },
    ],
  },
};
