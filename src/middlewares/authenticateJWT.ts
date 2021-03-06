import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (typeof authorizationHeader !== 'undefined') {
      const token = authorizationHeader.split(' ')[1];
      if (process.env.TOKEN_SECRET) {
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
      }
    }
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};

export default verifyAuthToken;
