const fs = require('fs');
const path = require('path');

module.exports.sendCards = (req, res) => {
  fs.readFile(path.join(__dirname, '../data/cards.json'), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Нет необходимого файла с данными' });
    }
    return res.send(JSON.parse(data));
  });
};
