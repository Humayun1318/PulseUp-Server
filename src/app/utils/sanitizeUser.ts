import type { IUser } from '../modules/user/user.interface';

export const sanitizeUser = (user: IUser): Omit<IUser, 'password'> => {
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};
