import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { sanitizeUser } from '../../utils/sanitizeUser';
import type { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

export const createUserIntoDB = async (
  payload: IUser,
): Promise<Omit<IUser, 'password'>> => {
  const isEmailTaken = await User.exists({ email: payload.email });
  if (isEmailTaken) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Email already exists! Try another one.',
    );
  }
  payload.lastLoginAt = new Date();
  const user = await User.create(payload);

  return sanitizeUser(user);
};

export const AuthService = {
  createUserIntoDB,
};
