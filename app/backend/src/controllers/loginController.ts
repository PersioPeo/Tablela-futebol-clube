import { Request, Response } from 'express';
import LoginService from '../services/loginServices';
import ErrorType from '../middleware/errorType';

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
}

export default LoginController;
