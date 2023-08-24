import express from 'express';

// controllers
import { post_users, post_users_login, get_users, put_users, put_users_password } from '../controllers/userController.js';

// // middleware
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// register route
userRouter.post('/users', post_users);

// // get users
// userRouter.get('/user', protect, get_users_list)

// login route
userRouter.post('/users/login', post_users_login);

// // logout route
// userRouter.get('/', post_users_logout)

// get the logged in user's data
userRouter.get('/users', protect, get_users);

// update logged in user's info
userRouter.put('/users', protect, put_users)

// reset logged in user's password
userRouter.put('/users/password', protect, put_users_password)

export default userRouter;
