import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';

// passport.use(
//   new GoogleStrategy(
//     {
//       // options for the google strat
//     }
//   ),
//   () => {}
// );

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
