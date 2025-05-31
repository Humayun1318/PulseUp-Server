import type { IUser } from './user.interface';
import { User } from './user.model';

export const getSingleUserFromDb = async (id: string): Promise<IUser> => {
  const user = await User.findUserById(id);
  console.log(user);

  const isM = await user.is

  if (user === null) {
    throw new Error('User not found');
  }

  if (
    user.isDeleted === true ||
    user.isActive === false ||
    user.isBanned === true
  ) {
    throw new Error('User is inactive or deleted');
  }

  return user;
};

export const UserService = {
  getSingleUserFromDb,
};
