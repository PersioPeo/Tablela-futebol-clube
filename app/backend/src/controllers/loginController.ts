import { Request, Response } from 'express';
import LoginService from '../services/loginServices';
import ErrorType from '../middleware/ErrorType';

class LoginController {
  service = new LoginService();

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorType(400, 'All fields must be filled');
    }
    const token = await this.service.login(req.body);
    if (token === 'null') {
      throw new ErrorType(401, 'Incorrect email or password');
    }
    return res.status(200).json({ token });
  }

  static async tokenValidation(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) {
      throw new ErrorType(401, 'Token invalid');
    }
    const role = LoginService.validate(token);
    return res.status(200).json({ role });
  }
}

export default LoginController;
