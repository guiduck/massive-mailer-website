const passport = require('passport');

//we assume this function is gonna be called with app object
module.exports = app => {
  //when user comes to this route, passport uses strategy called google
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
