const Card = require('../models/card');

module.exports.sendCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('Карточки не найдены');
      error.statusCode = 404;
      throw error;
    })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error('Карточка не найдена');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Неверный Id' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('Карточка не найдена');
      error.statusCode = 404;
      throw error;
    })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Неверный Id' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('Карточка не найдена');
      error.statusCode = 404;
      throw error;
    })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Неверный Id' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};
