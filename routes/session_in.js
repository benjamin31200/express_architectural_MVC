const sessionInRouter = require("express").Router();

  sessionInRouter.get('/', function(req, res) {
    if (req.session) {
        req.session.song = "be pop a lula";
        console.log(req.session);
        res.end()
    }
  });

module.exports = sessionInRouter;