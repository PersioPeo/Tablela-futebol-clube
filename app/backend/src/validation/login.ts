import { Request, Response } from 'express';
import LoginService from '../services/loginServices';
import ErrorType from '../middleware/errorType';

class Login {
  static async TokenValidation(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) {
      throw new ErrorType(401, 'Token invalid');
    }
    const role = LoginService.validate(token);
    return res.status(200).json({ role });
  }
}

export default Login;
