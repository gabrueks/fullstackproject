const passport = require('passport');

module.exports = app => {
  /*Google auth*/
  app.get('/auth/google',
   passport.authenticate('google', {
      scope: ['profile', 'email']
    }), (req, res, next) => {
      next();
    }
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect: '/logado/google', failureRedirect: '/login' }),
     (req, res, next) => {
      next();
    }
  );
  /*Google auth*/

  /*Facebook auth*/

  app.get('/auth/facebook',
   passport.authenticate('facebook'),
    (req, res, next) => {
      next();
    }
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/logado/facebook', failureRedirect: '/login' }),
     (req, res, next) => {
      next();
    }
  );
  /*Facebook auth*/

  app.get('/auth/logout', (req, res) => {
    req.logout();
    delete req.session;
    res.json({ user: 'success logout' });
  })

  app.get('/api/current_user', (req, res) =>{
    res.send(req.user);
  })
}
