const User = require('../models/user');

module.exports.sendUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('Пользователи не найдены');
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.sendUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};
