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
