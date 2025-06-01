import { z } from 'zod';

import { passwordMinNumber } from '../user/user.constant';

const loginValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Email is invalid')
      .trim()
      .toLowerCase(),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(passwordMinNumber, 'Password must be at least 6 characters'),
  }),
});

export const AuthValidation = {
  loginValidation,
};
