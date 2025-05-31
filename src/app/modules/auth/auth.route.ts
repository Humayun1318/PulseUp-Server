import { Router } from 'express';

import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from '../user/user.validation';

const router = Router();

router.post(
  '/create-user',
  validateRequest(userValidation.createUserValidationShema),
  AuthController.createUserHandler,
);
// router.put('/');

export const AuthRoutes = router;
