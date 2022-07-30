const moviesRouter = require('./movies');
const usersRouter = require('./users');
const checkCredentialRouter = require('./checkCredential');
const sessionInRouter = require('./session_in');
const sessionOutRouter = require('./session_out');
const uploadRouter = require('./upload');

const setupRoutes = (app) => {
  app.use('/api/movies', moviesRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/auth/checkCredential', checkCredentialRouter);
  app.use('/session-in', sessionInRouter);
  app.use('/session-out', sessionOutRouter);
  app.use('/uploaddufichier', uploadRouter);
};

module.exports = {
  setupRoutes
};
