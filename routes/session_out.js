const sessionOutRouter = require("express").Router();


sessionOutRouter.get('/', function(req, res) {
    if (req.session.song) {
      res.write('<p>' + req.session.song + '</p>')
      res.end()
    }
  });

module.exports = sessionOutRouter;