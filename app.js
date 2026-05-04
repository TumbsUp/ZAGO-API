require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const foodRouter = require('./routes/Foods')
const drinksRouter = require('./routes/Drinks')
const newsRouter = require('./routes/News')

const authRouter = require('./routes/Auth')
const auth       = require('./middleware/auth')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// add this after the existing app declarations:
app.use(cors({ origin: process.env.FRONT_END_URL })) // your React port
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err))


app.use('/auth', authRouter)  
app.use('/', indexRouter);
app.use('/food', foodRouter);
app.use('/drinks', drinksRouter);
app.use('/news', newsRouter);

module.exports = app;
