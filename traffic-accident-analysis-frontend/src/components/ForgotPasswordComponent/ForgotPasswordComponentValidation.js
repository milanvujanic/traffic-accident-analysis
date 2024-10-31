import { z } from "zod";

const emailRegex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);

const forgotPasswordValidation = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(emailRegex, { message: "Invalid email address" }),
  });

export default forgotPasswordValidation;
