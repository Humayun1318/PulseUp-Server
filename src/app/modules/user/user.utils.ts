import httpStatus from 'http-status';

import AppError from '../../errors/AppError';

type TUser = {
  isDeleted?: boolean;
  isBanned?: boolean;
  isActive?: boolean;
  isPasswordMatch: (password: string) => Promise<boolean>;
};

async function validateUser(
  user: TUser | null,
  password?: string,
): Promise<void> {
  // 1. Check if user exists
  if (user === null) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found. Please check the provided credentials or register.',
    );
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
