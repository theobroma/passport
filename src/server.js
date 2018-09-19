import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth20';

import './env';
// import { connect } from './db';
import db from './db/postgres';

import authRoutes from './routes/auth-routes';
import todosRoutes from './routes/todos-routes';
import profileRoutes from './routes/profile-routes';

const keys = require('../config/keys');
// import passportSetup from './config/passport-setup';

const app = express();

// console.log('clientID', process.env.clientID);
// console.log('clientSecret', process.env.clientSecret);
// console.log('callbackURL', process.env.callbackURL);
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

app.use(express.static(path.join(__dirname, 'static')));

// same port as client use http://localhost:3000
app.use('*', cors({ origin: 'http://localhost:3000' }));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      // User.findOrCreate({ githubId: profile.id }, (err, user) => done (err, user));
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(refreshToken);
      console.log(profile);
      // check if user already exists in our own db
      // User.findOne({ googleId: profile.id }).then((currentUser) => {
      //   if (currentUser) {
      //     // already have this user
      //     console.log('user is: ', currentUser);
      //     done(null, currentUser);
      //   } else {
      //     // if not, create user in our db
      //     new User({
      //       googleId: profile.id,
      //       username: profile.displayName,
      //       thumbnail: profile._json.image.url
      //     })
      //       .save()
      //       .then((newUser) => {
      //         console.log('created new user: ', newUser);
      //         done(null, newUser);
      //       });
      //   }
      // });
    }
  )
);

// set up routes
// All routes in the end
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
// app.use('/todos', todosRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(app.get('port'), () => console.log(`Server is now running on http://localhost:${app.get('port')}`));
