import type { Document, Model, Types } from 'mongoose';

export interface IUserName {
  firstName: string;
  lastName: string;
}

// Main User Interface
export interface IUser extends Document {
  username: IUserName;
  email: string;
  password: string;
  profilePic?: string;
  coverPic?: string;
  bio?: string;
  website?: string;
  location?: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  isActive: boolean;
  isDeleted: boolean;
  isBanned: boolean;
  role: 'user' | 'admin';
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  isUserExistById(id: string): Promise<boolean>;
  findUserById(id: string): Promise<IUser | null>;
}
