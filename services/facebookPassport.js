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
        callbackURL: 'http://localhost:3000'
    },
    async (acessToken, refreshToken, profile, done) =>{
      console.log(profile)
        const existingUser = await FacebookUser.findOne({ facebookId: profile.id })
          if(existingUser){
            done(null, existingUser);
          }else{
            const user = await new FacebookUser({ facebookId: profile.id }).save()
            done(null, user);
          }
    }
  )
)
