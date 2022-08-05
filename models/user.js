import { connection } from '../db-config.js';
import pkgJoi from 'joi';
const { object, string } = pkgJoi;
import pkg from 'argon2';
const { argon2id, hash, verify } = pkg;

const hashingOptions = {
  type: argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1
};

export const hashPassword = (plainPassword) => {
  return hash(plainPassword, hashingOptions);
};

export const verifyPassword = (plainPassword, hashedPassword) => {
  return verify(hashedPassword, plainPassword, hashingOptions);
};

const db = connection.promise();

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return object({
    email: string().email().max(255).presence(presence),
    firstname: string().max(255).presence(presence),
    lastname: string().max(255).presence(presence),
    city: string().allow(null, '').max(255),
    language: string().allow(null, '').max(255),
    hashedPassword: string().max(255).presence(presence).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }).validate(data, { abortEarly: false }).error;
};

export const findMany = async ({ filters: { language } }) => {
  let sql = 'SELECT * FROM users';
  const sqlValues = [];
  if (language) {
    sql += ' WHERE language = ?';
    sqlValues.push(language);
  }

  const [results] = await db.query(sql, sqlValues);
  return results;
};

const findOne = (id) => {
  return db
    .query('SELECT * FROM users WHERE id = ?', [id])
    .then(([results]) => results[0]);
};

const findByEmail = (email) => {
  return db
    .query('SELECT * FROM users WHERE email = ?', [email])
    .then(([results]) => results[0]);
};

const findByEmailWithDifferentId = (email, id) => {
  return db
    .query('SELECT * FROM users WHERE email = ? AND id <> ?', [email, id])
    .then(([results]) => results[0]);
};

const create = (data) => {
  return db.query('INSERT INTO users SET ?', data).then(([result]) => {
    const id = result.insertId;
    return { ...data, id };
  });
};

const update = (id, newAttributes) => {
  return db.query('UPDATE users SET ? WHERE id = ?', [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .query('DELETE FROM users WHERE id = ?', [id])
    .then(([result]) => result.affectedRows !== 0);
};

const findByToken = (token) => {
  return db.query('SELECT id from users WHERE token = ?', [token])
  .then(([result]) => result[0]);
}

export default {
  findMany,
  findOne,
  validate,
  create,
  update,
  destroy,
  findByEmail,
  findByEmailWithDifferentId,
  hashPassword,
  verifyPassword,
  findByToken
};