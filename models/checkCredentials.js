import { connection } from "../db-config.js";

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

export default {
  verifyUser
};
