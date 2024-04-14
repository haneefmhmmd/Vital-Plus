const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (userId, roleId, email) => {
  return jwt.sign({ userId, roleId, email }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const verifyAccessToken = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
      } catch (error) {
        throw new Error("Invalid/Expired token");
      }
    }
    throw new Error('n token must be "Bearer [token]"');
  }
  throw new Error("Authorization header must be provided");
};

module.exports = { createToken, verifyAccessToken };
