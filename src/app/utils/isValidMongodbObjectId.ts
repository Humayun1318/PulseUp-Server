import mongoose from 'mongoose';

export const isValidMongodbObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};
