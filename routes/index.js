const moviesRouter = require('./movies');
const usersRouter = require('./users');
const checkCredentialRouter = require('./checkCredential');

const setupRoutes = (app) => {
  app.use('/api/movies', moviesRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/auth/checkCredential', checkCredentialRouter);
};

module.exports = {
  setupRoutes,
};
