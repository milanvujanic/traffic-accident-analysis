import { z } from "zod";

const usernameRegex = new RegExp(/^\w{3,}$/);
const passwordRegex = new RegExp(
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,30}$/
);
const emailRegex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);

const signupFormValidation = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "Username must contain at least 3 characters",
      })
      .regex(usernameRegex, {
        message: "Allowed characters: letters, digits and underscore",
      }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(emailRegex, { message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(30, { message: "Password must be at most 30 characters" })
      .regex(passwordRegex, {
        message:
          "Password must contain small letters, capital letters and numbers",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default signupFormValidation;
