import type { IUser } from '../modules/user/user.interface';
import type { ISanitizedUserForLogin } from '../types';

export const sanitizeUserForLogin = (user: IUser): ISanitizedUserForLogin => {
  return {
    id: user.id.toString(),
    email: user.email,
    username: {
      firstName: user.username.firstName,
      lastName: user.username.lastName,
    },
    profilePic: user.profilePic ?? '',
    role: user.role,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt ?? null,
  };
};
