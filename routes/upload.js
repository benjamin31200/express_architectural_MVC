const uploadRouter = require("express").Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

uploadRouter.post('/', upload.single('monfichier'), function (req, res, next) {
    fs.rename(req.file.path, 'public/images/' + req.file.originalname, function(err){
      if (err) {
          res.send('problème durant le déplacement');
      } else {
          res.send('Fichier uploadé avec succès');
      }
    });
  })

module.exports = uploadRouter;