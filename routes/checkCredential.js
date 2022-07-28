const checkCredentialRouter = require("express").Router();
const { verifyPassword, hashPassword } = require("../models/user");
const checkCredential = require("../models/checkCredentials");

checkCredentialRouter.get("/", (req, res) => {
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
                res.status(200).json(users);
              }
            }
          );
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Email ou mot de passe incorrect");
    });
});

module.exports = checkCredentialRouter;