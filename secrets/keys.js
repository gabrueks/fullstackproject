require('dotenv').config();

if (process.env.NODE_ENV === 'prod') {
  console.log(process.env.NODE_ENV)
  console.log(1);
  module.exports = require('./dev');
} else {
  console.log(process.env.NODE_ENV)
  module.exports = require('./dev');
}