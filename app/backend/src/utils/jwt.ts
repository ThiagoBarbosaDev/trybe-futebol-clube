import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ILoginBody } from '../interfaces';
import CustomError from './CustomError';
import 'dotenv/config';

type token = (string | undefined);

const TOKEN_NOT_FOUND_ERROR_MESSAGE = 'Token not found';
export default class HandleJWT {
  static createToken = (data: ILoginBody) => {
    const token = sign(data, process.env.JWT_SECRET as string, {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    return token;
  };

  static authenticate = (token: token) => {
    if (!token) { throw new CustomError(TOKEN_NOT_FOUND_ERROR_MESSAGE, 401); }
    try {
      verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch (error) {
      throw new CustomError('Token must be a valid token', 401);
    }
  };

  static verifyRole = (token:(string | undefined)):string => {
    if (!token) { throw new CustomError(TOKEN_NOT_FOUND_ERROR_MESSAGE, 401); }
    const { email } = verify(token, process.env.JWT_SECRET as string) as Record<string, string>;
    return email;
  };
}
