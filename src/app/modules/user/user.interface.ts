import type { Document, Model, Types } from 'mongoose';

import type { USER_ROLE } from './user.constant';

export interface IUserName {
  firstName: string;
  lastName: string;
}

// Main User Interface
export interface IUser extends Document {
  _id: string;
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

export type TUserRole = keyof typeof USER_ROLE;
export type TUserWithInsMethods = IUser & IUserMethods;

// for instance methods
export interface IUserMethods {
  isPasswordMatch(plainPassword: string): Promise<boolean>;
}

export interface UserModel
  extends Model<IUser, Record<string, never>, IUserMethods> {
  isUserExistById(id: string): Promise<boolean>;
  findUserById(id: string): Promise<TUserWithInsMethods | null>;
}
