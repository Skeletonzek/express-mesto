const fs = require('fs');
const path = require('path');

module.exports.sendUsers = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Нет необходимого файла с данными' });
    }
    return res.send(JSON.parse(data));
  });
};

module.exports.sendUser = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Нет необходимого файла с данными' });
    }
    const users = JSON.parse(data);
    const user = users.find((el) => el._id === req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.send(user);
  });
};
