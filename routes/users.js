const userRouter = require('express').Router();
const {
  sendUsers,
  sendUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', sendUsers);
userRouter.post('/users', createUser);
userRouter.get('/users/:userId', sendUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
