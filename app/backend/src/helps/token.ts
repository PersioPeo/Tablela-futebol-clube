import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IUser from '../interface/IUser';

dotenv.config();
const secret = process.env.JWT_SECRET || 'jwt_secret';
export default class Jwt {
  static create(payload: Omit<IUser, 'password'>): string {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  }

  static verify(token: string) {
    const payload = jwt.verify(token, secret);
    const { data } = payload as jwt.JwtPayload;
    const { role } = data;
    return role;
  }
}
