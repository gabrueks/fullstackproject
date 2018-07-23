if (process.env.NODE_ENV === 'prod') {
  module.exports = require('./dev');
} else {
  module.exports = require('./dev');
}