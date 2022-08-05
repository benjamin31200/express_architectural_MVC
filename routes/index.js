import moviesRouter from './movies.js';
import usersRouter from './users.js';
import checkCredentialRouter from './checkCredential.js';
import sessionInRouter from './session_in.js';
import sessionOutRouter from './session_out.js';
import uploadRouter from './upload.js';

export const setupRoutes = (app) => {
  app.use('/api/movies', moviesRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/auth/checkCredential', checkCredentialRouter);
  app.use('/session-in', sessionInRouter);
  app.use('/session-out', sessionOutRouter);
  app.use('/uploaddufichier', uploadRouter);
};