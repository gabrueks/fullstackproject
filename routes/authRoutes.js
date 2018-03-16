const passport = require('passport');

module.exports = app =>{
  /*Google auth*/
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    }),
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/logado');
    }
  );
  /*Google auth*/

  /*Facebook auth*/

  app.get('/auth/facebook', passport.authenticate('facebook'),
    (req, res) => {
      require('./services/facebookPassport');
    }
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/logado');
    }
  );
  /*Facebook auth*/

  app.get('/auth/logout', (req, res) => {
    req.logout();
    delete req.session;
    res.redirect('/');
  })

  app.get('/api/current_user', (req, res) =>{
    res.send(req.user);
  })
}
