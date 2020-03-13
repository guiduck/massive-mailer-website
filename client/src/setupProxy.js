const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  //this will take request from browser on that relative route and send it to target + relative route
  app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
};
