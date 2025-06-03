export interface ISanitizedUser {
  id: string;
  username: {
    firstName: string;
    lastName: string;
  };
  email: string;
  profilePic: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: Date;
}

export interface ISanitizedUserForLogin {
  id: string;
  email: string;
  username: {
    firstName: string;
    lastName: string;
  };
  profilePic: string;
  role: 'user' | 'admin';
  isActive: boolean;
  lastLoginAt: Date | null;
}
