var development_env = require('./development');
var product_env = require('./product');

module.exports = {
  development: development_env,
  product: product_env
}[process.env.NODE_ENV || 'development'];
