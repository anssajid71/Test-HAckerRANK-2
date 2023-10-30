var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var middleware = require('./middleware');

var recipesRouter = require('./routes/recipes');

var app = express();

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/recipes', recipesRouter);
const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
