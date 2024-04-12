const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const createToken = (userId, roleId, email) => {
  return jsonwebtoken.sign({ userId, roleId, email }, SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 1000,
  });
};

const jwt = { createToken };

module.exports = jwt;
