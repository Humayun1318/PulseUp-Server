import type { IUser } from './user.interface';
import { User } from './user.model';
import validateUser from './user.utils';

export const getSingleUserFromDb = async (
  id: string,
): Promise<IUser | null> => {
  const user = await User.findById(id);

  // checking isDeleted,isBanned, isActive and also the user exist or not
  await validateUser(user);
  return user;
};

export const UserService = {
  getSingleUserFromDb,
};
