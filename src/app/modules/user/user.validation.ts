/* eslint-disable no-magic-numbers */
import { z } from 'zod';

import { passwordMinNumber, USERNAME_VALIDATION } from './user.constant';

// Define role enum
export const UserRoleEnum = z.enum(['user', 'admin']);

// Reusable email regex
const emailRegex = /\S+@\S+\.\S+/;

const nameValidationShema = z.object(
  {
    firstName: z
      .string()
      .trim()
      .min(USERNAME_VALIDATION.FIRST_NAME_MIN, 'Must be at least 1 char!')
      .max(
        USERNAME_VALIDATION.FIRST_NAME_MAX,
        `No greater than ${USERNAME_VALIDATION.FIRST_NAME_MAX} char!`,
      )
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      }),
    lastName: z
      .string()
      .trim()
      .min(USERNAME_VALIDATION.FIRST_NAME_MIN, 'Must be at least 1 char!')
      .max(
        USERNAME_VALIDATION.FIRST_NAME_MAX,
        `No greater than ${USERNAME_VALIDATION.FIRST_NAME_MAX} char!`,
      ),
  },
  { required_error: 'Username is required!' },
);

const createUserValidationShema = z.object({
  body: z
    .object({
      username: nameValidationShema,
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email('Email is invalid')
        .regex(emailRegex, 'Email is invalid')
        .trim()
        .toLowerCase(),

      password: z
        .string({
          required_error: 'Password is required',
        })
        .min(passwordMinNumber, 'Password must be at least 6 characters'),

      profilePic: z
        .string()
        .trim()
        .url('Profile picture must be a valid URL')
        .optional(),
      coverPic: z
        .string()
        .trim()
        .url('Cover picture must be a valid URL')
        .optional(),
      website: z.string().trim().url('Website must be a valid URL').optional(),
      bio: z
        .string()
        .trim()
        .max(300, 'Bio must be less than 300 characters')
        .optional(),
      location: z
        .string()
        .trim()
        .max(100, 'Location must be less than 100 characters')
        .optional(),
    })
    .strict(), // Prevent unknown keys,
});

export const userValidation = {
  createUserValidationShema,
};
