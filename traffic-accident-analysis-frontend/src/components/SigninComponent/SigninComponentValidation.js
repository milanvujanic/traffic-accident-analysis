import { z } from 'zod';

const passwordRegex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,30}$/);

const signinFormValidation = z.object({
  username: 
    z.string().min(3, {message: 'Username must be at least 3 characters'}),
  password: 
    z.string().min(8, {message: 'Password must be at least 8 characters'})
              .max(30, {message: 'Password must be at most 30 characters'})
              .regex(passwordRegex, {message: 'Password must contain small letters, capital letters and numbers'}),
});

export default signinFormValidation;