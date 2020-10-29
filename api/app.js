var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const bodyParser = require('body-parser');
var session = require('express-session');
const Knex = require('knex');
const knexConfig = require('./knexfile');

const { Model } = require('objection');
const { User } = require('./models/User');

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knex);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var random = require('./routes/random');
var all = require('./routes/all');
var create = require('./routes/createPiece');

var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "cats" }));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { 
        console.log("errored at the get go");
        return done(err); 
      }
      if (!user) {
        console.log("errored when finding user");
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log("errored when finding password")
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/api/random', random);
app.use('/api/all', all);
app.use('/api/create', create);
app.post('/api/login',
  passport.authenticate('local', { 
    successRedirect: '/random',
    failureRedirect: '/failedHard',
    failureFlash: false 
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(res.err)
  console.log(err);
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("ahh error hadnler!");

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function createUserSchema() {
  if (await knex.schema.hasTable('users')) {
    return;
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username');
    table.string('password');
  });
}

async function dbTest() {
  const sylvesters = await User.query()
  .where('*')
  .orderBy('id');

  console.log('sylvesters:', sylvesters);
}

dbTest()

module.exports = app;
