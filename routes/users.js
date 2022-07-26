import Router from "express-promise-router";
export const usersRouter = Router();
import User from "../models/user.js";
import { findMany } from "../models/user.js";
import { calculateToken} from "../helpers/users.js";

usersRouter.post("/", (req, res) => {
  const { language } = req.query;
  findMany({ filters: { language } })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving users from database");
    });
});

usersRouter.get("/:id", (req, res) => {
  User.findOne(req.params.id)
    .then((user) => {
      if (user) res.json(user);
      else res.status(404).send("User not found");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving user from database");
    });
});

usersRouter.post("/pass", (req, res) => {
  let { hashedPassword, ...data } = req.body;
  const { email } = data;
  let validationErrors = null;
  User.findByEmail(email)
    .then((existingUserWithEmail) => {
      if (existingUserWithEmail) return Promise.reject("DUPLICATE_EMAIL");
      validationErrors = User.validate(req.body);
      if (validationErrors) return Promise.reject("INVALID_DATA");
      User.hashPassword(hashedPassword).then((hashedPassword) => {
        const newPass = { ...data, hashedPassword};
        User.create(newPass).then((createdUser) => {
          res.cookie('user_token', calculateToken(createdUser.email));
          res.status(201).json(createdUser);
        });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err === "DUPLICATE_EMAIL")
        res.status(409).json({ message: "This email is already used" });
      else if (err === "INVALID_DATA")
        res.status(422).json({ validationErrors });
      else res.status(500).send("Error saving the user");
    });
});

usersRouter.put("/:id", (req, res) => {
  let existingUser = null;
  let validationErrors = null;
  Promise.all([
    User.findOne(req.params.id),
    User.findByEmailWithDifferentId(req.body.email, req.params.id),
  ])
    .then(([user, otherUserWithEmail]) => {
      existingUser = user;
      if (!existingUser) return Promise.reject("RECORD_NOT_FOUND");
      if (otherUserWithEmail) return Promise.reject("DUPLICATE_EMAIL");
      validationErrors = User.validate(req.body, false);
      if (validationErrors) return Promise.reject("INVALID_DATA");
        User.update(req.params.id, req.body); 
        res.cookie('user_token', calculateToken(user.email));
    })
    .then(() => {
      res.status(200).json({ ...existingUser, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === "RECORD_NOT_FOUND")
        res.status(404).send(`User with id ${userId} not found.`);
      if (err === "DUPLICATE_EMAIL")
        res.status(409).json({ message: "This email is already used" });
      else if (err === "INVALID_DATA")
        res.status(422).json({ validationErrors });
      else res.status(500).send("Error updating a user");
    });
});

usersRouter.delete("/:id", (req, res) => {
  User.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send("🎉 User deleted!");
      else res.status(404).send("User not found");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting a user");
    });
});

export default usersRouter;
