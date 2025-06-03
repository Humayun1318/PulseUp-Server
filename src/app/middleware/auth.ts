import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import config from '../config';
import AppError from '../errors/AppError';
import { verifyToken } from '../modules/auth/auth.utils';
import type { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import validateUser from '../modules/user/user.utils';
import catchAsync from '../utils/catchAsync';

export const auth = (
  ...requiredRoles: TUserRole[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const token = req.headers.authorization;

      // checking if the token is missing
      if (typeof token !== 'string' || token.trim() === '' || !token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const decoded = verifyToken(token, config.jwt_access_secret as string);

      const { role, userId } = decoded;

      const user = await User.findUserById(userId);

      await validateUser(user);

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      req.user = decoded;
      next();
    },
  );
};
