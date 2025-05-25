import type { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

export const createUserIntoDB = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  createUserIntoDB,
};
