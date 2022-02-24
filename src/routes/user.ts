import { Router } from 'express';
import productsController from '../controllers/productsController';
import userController from '../controllers/userController';
import validateJwt from '../middlewares/validateJWT';

const router = Router();

router.post('/users', userController.create);

router.post('/login', userController.login);

router.post('/products', validateJwt, productsController.create);

router.get('/products', validateJwt, productsController.getAll);

export default router;