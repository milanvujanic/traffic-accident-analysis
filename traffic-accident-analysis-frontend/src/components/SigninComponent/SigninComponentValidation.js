import { z } from "zod";

const usernameRegex = new RegExp(/^\w{3,}$/);
const passwordRegex = new RegExp(
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,30}$/
);

const signinFormValidation = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must contain at least 3 characters",
    })
    .regex(usernameRegex, {
      message:
        "Allowed characters: letters, digits and underscore",
    }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" })
    .max(30, { message: "Password must contain at most 30 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain small letters, capital letters and numbers",
    }),
});

export default signinFormValidation;
