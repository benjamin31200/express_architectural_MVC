import { connection } from "../db-config.js";
import pkg from 'joi';
const { object, string, number, boolean } = pkg;

const db = connection.promise();

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return object({
    title: string().max(255).presence(presence),
    director: string().max(255).presence(presence),
    year: number().integer().min(1888).presence(presence),
    color: boolean().presence(presence),
    duration: number().integer().min(1).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const findByUserId = (userId) => {
  return db
    .query("SELECT * FROM users WHERE id = ?", [userId])
    .then(([results]) => results);
};

const findMany = ({ filters: { color, max_duration } }) => {
  let sql = "SELECT * FROM movies";
  const sqlValues = [];

  if (color) {
    sql += " WHERE color = ?";
    sqlValues.push(color);
  }
  if (max_duration) {
    if (color) sql += " AND duration <= ? ;";
    else sql += " WHERE duration <= ?";

    sqlValues.push(max_duration);
  }
  return db.query(sql, sqlValues).then(([results]) => results);
};

const findOne = (id) => {
  return db
    .query("SELECT * FROM movies WHERE id = ?", [id])
    .then(([results]) => results[0]);
};

const create = (data) => {
  return db.query("INSERT INTO movies SET ?", data).then(([result]) => {
    const id = result.insertId;
    return { id, ...data };
  });
};

const update = (id, newAttributes) => {
  return db.query("UPDATE movies SET ? WHERE id = ?", [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .query("DELETE FROM movies WHERE id = ?", [id])
    .then(([result]) => result.affectedRows !== 0);
};

export default {
  findMany,
  findOne,
  validate,
  create,
  update,
  destroy,
  findByUserId
};
