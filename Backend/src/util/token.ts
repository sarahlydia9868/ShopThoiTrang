import jwt from 'jsonwebtoken';
import config from './config';

function generateToken(id: string) {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
