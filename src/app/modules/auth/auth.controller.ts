import status from 'http-status';

import { createUserIntoDB } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createUserHandler = catchAsync(async (req, res) => {
  const user = await createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: user,
  });
});

export const AuthController = {
  createUserHandler,
};
