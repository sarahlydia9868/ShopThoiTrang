import express from 'express';
import userController from '../controller/user';
import { admin, auth } from '../middleware/auth';

const router = express.Router();

router.route('/').get(userController.getUsersList); //TODO: set quyền truy cập admin
router.route('/promote/:id').post(auth, admin, userController.promoteAdmin);
router
  .route('/:id')
  .get(userController.getUserBydId)
  .delete(auth, admin, userController.deleteUser)
  .put(auth, userController.updateUserProfile);
router.route('/register').post(userController.register);
router.route('/login').post(userController.login);

export default router;
