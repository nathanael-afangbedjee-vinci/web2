var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var pizzaRouter = require('./routes/pizzas');
var filmsRouter = require('./routes/films');
var usersRouter = require('./routes/users');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const stats = {};

app.use((req, res, next) => {
  const currentOperation = `${req.method} ${req.path}`;
  const currentOperationCounter = stats[currentOperation];
  if (currentOperationCounter === undefined) stats[currentOperation] = 0;
  stats[currentOperation] += 1;
  const statsMessage = `Request counter : \n${Object.keys(stats)
    .map((operation) => `- ${operation} : ${stats[operation]}`)
    .join('\n')}
      `;
  console.log(statsMessage);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/pizzas', pizzaRouter);
app.use('/films', filmsRouter);
app.use('/users', usersRouter);


module.exports = app;
