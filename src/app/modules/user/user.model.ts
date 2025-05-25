import type { Types } from 'mongoose';
import { model, Schema } from 'mongoose';

import { FOLLOWER_LIMIT, USERNAME_VALIDATION } from './user.constant';
import type { IUser } from './user.interface';

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

const UserSchema = new Schema<IUser>(
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
    },

    coverPic: {
      type: String,
      default: '',
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

export const User = model<IUser>('User', UserSchema);
