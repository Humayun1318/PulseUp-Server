import { Router } from 'express';

import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.get('/:id', auth(USER_ROLE.user), UserController.getSingleUserHandler);
// router.put('/');

export const UserRoutes = router;
