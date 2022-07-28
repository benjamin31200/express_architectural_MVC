const connection = require("../db-config");
const Joi = require("joi");

const db = connection.promise();

const verifyUser = ({ filters: { email, hashedPassword } }) => {
  let sql = "SELECT * FROM users";
  const sqlValues = [];
  if (email) {
    sql += " WHERE email = ?";
    sqlValues.push(email);
    if (hashedPassword)
    sql += " AND hashedPassword = ?";
    sqlValues.push(hashedPassword);
  }
  return db.query(sql, sqlValues).then(([results]) => results);
};

module.exports = {
  verifyUser
};
