import status from 'http-status';

import { getSingleUserFromDb } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getSingleUserHandler = catchAsync(async (req, res) => {
  console.log('controller user:', req.cookies);
  // console.log('controller user from  req:', req.user);
  const { id } = req.params;
  const user = await getSingleUserFromDb(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: user,
  });
});

export const UserController = {
  getSingleUserHandler,
};
