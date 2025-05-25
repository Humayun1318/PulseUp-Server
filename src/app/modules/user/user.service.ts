import type { IUser } from './user.interface';
import { User } from './user.model';
import { isValidMongodbObjectId } from '../../utils/isValidMongodbObjectId';

export const getSingleUserFromDb = async (id: string): Promise<IUser> => {
  if (!isValidMongodbObjectId(id)) {
    throw new Error('Invalid user ID');
  }

  const result = await User.findById(id);

  if (result === null || result === undefined) {
    throw new Error('User not found');
  }

  if (result.isDeleted === true || result.isActive === false) {
    throw new Error('User is inactive or deleted');
  }

  return result;
};

export const UserService = {
  getSingleUserFromDb,
};
