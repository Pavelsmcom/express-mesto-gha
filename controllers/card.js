const Card = require('../models/card');

const {
  HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(() => res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Bad Request' });
        return;
      }
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail()
    .then(() => {
      res.status(HTTP_STATUS_OK).send({ message: 'Пост удалён' });
    })
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

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
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

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
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
