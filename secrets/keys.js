if (process.env.NODE_ENV === 'prod') {
  console.log(process.env.NODE_ENV)
  module.exports = require('./dev');
} else {
  module.exports = require('./dev');
}