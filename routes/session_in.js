import Router from "express-promise-router";
export const sessionInRouter = Router();

  sessionInRouter.get('/', function(req, res) {
    if (req.session) {
        req.session.song = "be pop a lula";
        console.log(req.session);
        res.end()
    }
  });

export default sessionInRouter;