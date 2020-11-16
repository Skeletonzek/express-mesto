const users = require('../data/users.json');

module.exports.sendUsers = (req, res) => {
  res.send(users);
};

module.exports.sendUser = (req, res) => {
  users.forEach((el) => {
    if (el._id === req.params.id) {
      res.send(el);
    } else {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
  });
};
