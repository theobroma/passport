import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import passport from 'passport';
import nunjucks from 'nunjucks';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';

import './env';
// import { connect } from './db';
import db from './db/postgres';

import authRoutes from './routes/auth';
import todosRoutes from './routes/todos-routes';
import profileRoutes from './routes/profile';
import userRoutes from './routes/user';
import apiRoutes from './routes/api';

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
const viewFolders = [path.join(__dirname, '..', 'views')];

nunjucks.configure(viewFolders, {
  express: app,
  autoescape: true
});
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// uncomment if using express-session
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'static')));

// same port as client use http://localhost:3000
app.use('*', cors({ origin: 'http://localhost:3000' }));

// set up routes
// All routes in the end
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api', apiRoutes);
app.use('/', userRoutes);
// app.use('/todos', todosRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(app.get('port'), () => console.log(`Server is now running on http://localhost:${app.get('port')}`));
