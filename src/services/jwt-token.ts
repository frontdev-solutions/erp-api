import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export const signJwt = (payload: object, options = {}) => {
  return jwt.sign(payload, JWT_SECRET, {
    ...options,
  });
};
