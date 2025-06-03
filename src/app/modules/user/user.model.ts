import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

import { USERNAME_VALIDATION } from './user.constant';
import type {
  IUser,
  IUserMethods,
  TUserWithInsMethods,
  UserModel,
} from './user.interface';
import config from '../../config';

const UserNameSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [
        USERNAME_VALIDATION.FIRST_NAME_MIN,
        'First name must be at least 2 characters',
      ],
      maxlength: [
        USERNAME_VALIDATION.FIRST_NAME_MAX,
        'First name must be at most 15 characters',
      ],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [
        USERNAME_VALIDATION.LAST_NAME_MIN,
        'Last name must be at least 2 characters',
      ],
      maxlength: [
        USERNAME_VALIDATION.LAST_NAME_MAX,
        'Last name must be at most 15 characters',
      ],
      trim: true,
    },
  },
  { _id: false }, // This prevents mongoose from creating a separate _id for the nested schema
);

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: UserNameSchema,
      required: [true, 'Username is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // Important for security
    },

    profilePic: {
      type: String,
      default: '',
      trim: true,
    },

    coverPic: {
      type: String,
      default: '',
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    followers: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for follower/following count
UserSchema.virtual('followerCount').get(function (this: IUser) {
  return this.followers.length;
});

UserSchema.virtual('followingCount').get(function (this: IUser) {
  return this.following.length;
});

// User exist checking yes/no
UserSchema.statics.isUserExistById = async function (
  id: string,
): Promise<boolean> {
  const exists = await this.exists({ _id: id });
  return exists !== null;
};

// searching the user to get the user
UserSchema.statics.findUserById = function (
  id: string,
): Promise<TUserWithInsMethods | null> {
  return this.findById(id) as Promise<TUserWithInsMethods | null>;
};

// for hashing password
UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
});

// to set empty for password field
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// password matching check using instance methods
UserSchema.methods.isPasswordMatch = async function (
  plainPassword: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, this.password);
  return isMatch;
};

export const User = model<IUser, UserModel>('User', UserSchema);
