import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { ILoginBody } from '../interfaces';
import CustomError from './CustomError';
import 'dotenv/config';

export default class HandleJWT {
  static createToken = (data: ILoginBody) => {
    const token = sign(data, process.env.JWT_SECRET as string, {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    return token;
  };

  static verifyToken = (
    req: Request & Record<string, string>,
    _res: Response,
    next: NextFunction,
  ) => {
    const token = req.header('Authorization');
    if (!token) { throw new CustomError('Token not found', 401); }
    try {
      const decoded = verify(token, process.env.JWT_SECRET as string) as string;
      req.userData = decoded;
      next();
    } catch (error) {
      throw new CustomError('Invalid token', 401);
    }
  };

  static verifyRole = (token:string):string => {
    if (!token) { throw new CustomError('Token not found', 401); }
    const { email } = verify(token, process.env.JWT_SECRET as string) as Record<string, string>;
    return email;
  };
}
