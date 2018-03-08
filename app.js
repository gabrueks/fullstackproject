const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys')
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoDB);

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
  console.log('Aplicacao rodando na porta: ' + this.address().port)
});
