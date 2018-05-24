const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../secrets/keys');

const FacebookUser = mongoose.model('facebookUsers');

passport.use(
  new FacebookStrategy(
    {
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookAppSecret,
        callbackURL: '/auth/facebook/callback'
    },
    (acessToken, refreshToken, profile, done) =>{
      FacebookUser.findOne({ facebookId: profile.id })
        .then((existingUser) => {
          if(existingUser){
            done(null, existingUser);
          }else{
            new FacebookUser({ facebookId: profile.id }).save()
              .then(user => done(null, user));
          }
        })
    }
  )
)
