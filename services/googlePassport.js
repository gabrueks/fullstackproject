const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../secrets/keys');

const User = mongoose.model('googleUsers');
const FacebookUser = mongoose.model('facebookUsers');

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  if(user == null || user == undefined){
    const newUser = await FacebookUser.findById(id)
    return done(null, newUser);
  }else{
    done(null, user);
  }
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'http://localhost:3000/'
    },
    async (acessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
        
      if(existingUser){
        return done(null, existingUser);
      }
        
      const user = await new User({ googleId: profile.id }).save()
      done(null, user);
    })
)
