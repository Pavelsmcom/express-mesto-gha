const usersRoutes = require('express').Router();
const { validateMe, validateAvatar } = require('../utils/validation/validation');

const {
  getUsers, getUser, updateUser, updateUserAvatar, getMe,
} = require('../controllers/user');

usersRoutes.get('/', getUsers);
usersRoutes.patch('/me', validateMe, updateUser);
usersRoutes.get('/me', getMe);
usersRoutes.get('/:userId', getUser);
usersRoutes.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = usersRoutes;
