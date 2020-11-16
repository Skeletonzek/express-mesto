const cards = require('../data/cards.json');

module.exports.sendCards = (req, res) => {
  res.send(cards);
};
