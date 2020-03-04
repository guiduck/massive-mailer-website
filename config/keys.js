//figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  //we pruduction environment, return these keys
  module.exports = require('./prod');
} else {
  //we are dev environment, return these keys
  module.exports = require('./dev'); //pulls the dev file and immediatly exports to whos asking
}
