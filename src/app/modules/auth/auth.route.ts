import { Router } from 'express';

import { AuthController } from './auth.controller';

const router = Router();

router.get('/create-user', AuthController.createUserHandler);
router.put('/');

export const AuthRoutes = router;
