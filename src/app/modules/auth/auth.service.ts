import httpStatus from 'http-status';

import type { ILogin } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import AppError from '../../errors/AppError';
import type { ISanitizedUser, ISanitizedUserForLogin } from '../../types';
import { sanitizeUser } from '../../utils/sanitizeUser';
import { sanitizeUserForLogin } from '../../utils/sanitizeUserForLogin';
import type { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import validateUser from '../user/user.utils';

export const createUserIntoDB = async (
  payload: IUser,
): Promise<ISanitizedUser> => {
  const isEmailTaken = await User.exists({ email: payload.email });
  if (isEmailTaken) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Email already exists! Try another one.',
    );
  }
  const user = await User.create(payload);

  return sanitizeUser(user);
};

export const loginUser = async (
  payload: ILogin,
): Promise<{
  accessToken: string;
  refreshToken: string;
  loginedUser: ReturnType<typeof sanitizeUserForLogin> | undefined;
}> => {
  const { email, password } = payload;
  let loginedUser: ISanitizedUserForLogin;
  // Find the user by email and include the password field
  const user = await User.findOne({ email }).select('+password');

  // Validate user existence, active status, banned, deleted, and password correctness
  await validateUser(user, password);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  // Explicitly update lastLoginAt field in the database
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { lastLoginAt: new Date() },
    { new: true },
  );

  // Sanitize the user object to send only safe info to the client
  if (updatedUser) {
    loginedUser = sanitizeUserForLogin(updatedUser);
    // Create JWT payload
    const jwtPayload = {
      userId: updatedUser._id.toString(),
      role: updatedUser.role,
    };

    // Generate access token and refresh token
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_secret_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_secret_exires_in as string,
    );

    // Return tokens and sanitized user info
    return {
      accessToken,
      refreshToken,
      loginedUser,
    };
  }

  // Fallback if something unexpected happens (should rarely reach here)
  throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Login failed');
};
export const AuthService = {
  createUserIntoDB,
  loginUser,
};
