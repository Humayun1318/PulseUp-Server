import httpStatus from 'http-status';

import type { TUserWithInsMethods } from './user.interface';
import AppError from '../../errors/AppError';

async function validateUser(
  user: TUserWithInsMethods | null,
  password?: string,
): Promise<void> {
  // 1. Check if user exists
  if (user === null) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // 2. Check if user is deleted
  if (user.isDeleted === true) {
    throw new AppError(
      httpStatus.GONE,
      'This user account has been permanently deleted.',
    );
  }

  // 3. Check if user is banned
  if (user.isBanned === true) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This user account has been banned. Please contact support.',
    );
  }

  // 4. Check if user is inactive
  if (user.isActive === false) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'This user account is inactive. Please verify your account.',
    );
  }

  // Password check only happens if password is provided
  if (password !== undefined) {
    if (!password) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Password required');
    }

    if (!(await user.isPasswordMatch(password))) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Password is incorrect. Please try again.',
      );
    }
  }
}

export default validateUser;
