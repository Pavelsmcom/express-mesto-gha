const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'to many request from this IP',
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6405f65d8a11adbdb5553646',
  };
  next();
});

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Connect to DataBase');
  })
  .catch((error) => {
    console.log(`Error DataBase ${error}`);
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
