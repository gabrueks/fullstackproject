const express = require('express');
const mongoose = require('mongoose');
const keys = require('./secrets/dev');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

require('./models/googleUser');
require('./models/FacebookUser');
require('./services/facebookPassport');
require('./services/googlePassport');

mongoose.connect(keys.mongoDB);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000
app.listen(PORT, function(){
  console.log('Aplicacao rodando na porta: ' + this.address().port)
});
