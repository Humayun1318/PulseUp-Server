import httpStatus from 'http-status';

import type { ILogin } from './auth.interface';
import AppError from '../../errors/AppError';
import { sanitizeUser } from '../../utils/sanitizeUser';
import type { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import validateUser from '../user/user.utils';

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

export const loginUser = async (payload: ILogin) => {
  const { email, password } = payload;

  const user = await User.findOne({ email: email }).select('+password');

  await validateUser(user, password);

  const re = await User.findOneAndUpdate(
    { email: email },
    {
      lastLoginAt: new Date(),
    },
    { new: true },
  );

  return re;
};

export const AuthService = {
  createUserIntoDB,
  loginUser,
};
