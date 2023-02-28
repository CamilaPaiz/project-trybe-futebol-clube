import jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '72h',
};

export const generateToken = (payload: string | object) => jwt.sign(payload, secret, jwtConfig);

export const authenticateToken = async (token: string) => {
  try {
    const verificationResponse = await jwt.verify(token, secret);
    return verificationResponse;
  } catch (err) {
    console.log(err);
  }
};
