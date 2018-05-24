const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../secrets/keys');

const User = mongoose.model('googleUsers');
const FacebookUser = mongoose.model('facebookUsers');

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      if(user == null || user == undefined){
        FacebookUser.findById(id)
          .then(user => {
            done(null, user);
          })
      }else{
        done(null, user);
      }
    })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (acessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if(existingUser){
            done(null, existingUser);
          }else{
            new User({ googleId: profile.id }).save()
              .then(user => done(null,user))
          }
        })
    }
  )
)
