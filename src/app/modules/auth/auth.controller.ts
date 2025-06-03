import httpStatus from 'http-status';

import { AuthService, createUserIntoDB } from './auth.service';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createUserHandler = catchAsync(async (req, res) => {
  const user = await createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User is created successfully',
    data: user,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  const { refreshToken, accessToken, loginedUser } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data: {
      accessToken,
      loginedUser,
    },
  });
});

export const AuthController = {
  createUserHandler,
  loginUser,
};
