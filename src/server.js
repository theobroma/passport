import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import flash from 'connect-flash';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';

import './env';
// import { connect } from './db';
import db from './db/postgres';

import authRoutes from './routes/auth-routes';
import todosRoutes from './routes/todos-routes';
import profileRoutes from './routes/profile-routes';
import apiRoutes from './routes/api-routes';

const keys = require('../config/keys');
// import passportSetup from './config/passport-setup';

const app = express();

// 3000 used by webpack dev server
app.set('port', process.env.PORT || 3001);
/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */

// connect();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up vidw engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

passport.serializeUser((user, done) => {
  done(null, user.id);
  console.log(user);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  // User.findById(id, (err, user) => {
  //   err ? done(err) : done(null, user);
  // });
});

app.use(express.static(path.join(__dirname, 'static')));

// same port as client use http://localhost:3000
app.use('*', cors({ origin: 'http://localhost:3000' }));

passport.use(
  'local-login',
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {
      console.log('LocalStrategy=====');
      console.log(email);
      console.log(password);
      console.log('LocalStrategy=====');
      db
        .insert({
          email: 'theobroma333@gmail.com',
          password: '777'
        })
        .returning('*')
        .into('users');
    }
  )
);

// set up routes
// All routes in the end
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api', apiRoutes);
// app.use('/todos', todosRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(app.get('port'), () => console.log(`Server is now running on http://localhost:${app.get('port')}`));
