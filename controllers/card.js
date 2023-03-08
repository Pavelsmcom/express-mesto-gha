const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Bad Request' });
        return;
      }
      res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Bad Request' });
        return;
      }
      if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Not Found' });
        return;
      }
      res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Bad Request' });
        return;
      }
      if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Not Found' });
        return;
      }
      res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Bad Request' });
        return;
      }
      if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Not Found' });
        return;
      }
      res.status(500).send({ message: 'Internal Server Error' });
    });
};
