import { Router } from 'express';

import { UserController } from './user.controller';

const router = Router();

router.get('/:id', UserController.getSingleUserHandler);
router.put('/');

export const UserRoutes = router;
