const express = require('express');
const path = require('path');
const { sendUser, sendUsers } = require('./routes/users');
const { sendCards } = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', sendUsers);
app.get('/cards', sendCards);
app.get('/users/:id', sendUser);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
