import Router from "express-promise-router";
export const checkCredentialRouter = Router();
import { verifyPassword, hashPassword } from "../models/user.js";
import checkCredential from "../models/checkCredentials.js";
import { calculateToken} from "../helpers/users.js";

checkCredentialRouter.post("/", (req, res) => {
  const { email, hashedPassword } = req.query;
  hashPassword(hashedPassword)
    .then((hashPass) => {
      checkCredential
        .verifyUser({ filters: { email, hashPass } })
        .then((users) => {
          if (users.length === 0) {
            return res.send("Le mot de passe et l'email ne sont pas valides");
          }
          verifyPassword(hashedPassword, users[0].hashedPassword).then(
            (verify) => {
              if (users[0].email !== email && verify === true) {
                return res.status(401).send("email n'est pas valide");
              } else if (verify === false && users[0].email === email) {
                return res
                  .status(401)
                  .send("le mot de passe n'est pas valide !");
              } else {
                const userId = users[0].id;
                const token = calculateToken( [users[0].email, userId]);
                res.cookie('user_token', token);
                res.status(200).json(users);
              }
            }
          );
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Erreur dans la requête.");
    });
});

export default checkCredentialRouter;
