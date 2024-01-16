const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
const bodyParser = require('body-parser')


const authRouter = require('./routes/authRouter');
const barkRouter = require('./routes/barkRouter');

var app = express();
var cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// HTTP Request logger
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/bark', barkRouter);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
