import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/users', userController.create);

// router.post('/login', );

export default router;