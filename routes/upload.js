import Router from "express-promise-router";
export const uploadRouter = Router();
import multer from 'multer';
const upload = multer({ dest: 'tmp/' });
import { rename } from 'fs';

uploadRouter.post('/', upload.single('monfichier'), function (req, res, next) {
    rename(req.file.path, 'public/images/' + req.file.originalname, function(err){
      if (err) {
          res.send('problème durant le déplacement');
      } else {
          res.send('Fichier uploadé avec succès');
      }
    });
  })

export default uploadRouter;