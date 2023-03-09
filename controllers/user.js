const User = require('../models/user');

const {
  HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS_OK).send(users))
    .catch(() => res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Bad Request' });
        return;
      }
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId, undefined, { runValidators: true })
    .orFail()
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Bad Request' });
        return;
      }
      if (error.name === 'DocumentNotFoundError') {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Not Found' });
        return;
      }
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Bad Request' });
        return;
      }
      if (error.name === 'CastError') {
        res.status(404).send({ message: 'Not Found' });
        return;
      }
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Bad Request' });
        return;
      }
      if (error.name === 'CastError') {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Not Found' });
        return;
      }
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    });
};
