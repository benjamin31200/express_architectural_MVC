import Router from "express-promise-router";
export const sessionOutRouter = Router();


sessionOutRouter.get('/', function(req, res) {
    if (req.session.song) {
      res.write('<p>' + req.session.song + '</p>')
      res.end()
    }
  });

export default sessionOutRouter;