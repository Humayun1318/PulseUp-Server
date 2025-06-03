import type { IUser } from '../modules/user/user.interface';
import type { ISanitizedUser } from '../types';

export const sanitizeUser = (user: IUser): ISanitizedUser => {
  return {
    id: user.id?.toString(),
    username: {
      firstName: user.username?.firstName,
      lastName: user.username?.lastName,
    },
    email: user.email,
    profilePic: user.profilePic ?? '',
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
};
