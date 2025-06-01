import { Router } from 'express';

import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from '../user/user.validation';

const router = Router();

router.post(
  '/register/create-user',
  validateRequest(userValidation.createUserValidationShema),
  AuthController.createUserHandler,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidation),
  AuthController.loginUser,
);

export const AuthRoutes = router;
