import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,30}$/
);

const resetPasswordFormValidation = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(30, { message: "Password must contain at most 30 characters" })
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

export default resetPasswordFormValidation;
