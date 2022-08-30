import { Request, Response } from 'express';
import LoginService from '../services/loginServices';
import ErrorType from '../middleware/ErrorType';

class LoginController {
  private loginService = new LoginService();

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorType(400, 'All fields must be filled');
    }
    const token = await this.loginService.login(req.body);
    if (token === 'null') {
      throw new ErrorType(401, 'Incorrect email or password');
    }
    return res.status(200).json({ token });
  }

  static async tokenValidation(req: Request, res: Response) {
    const resultToken = req.headers.authorization;
    if (!resultToken) {
      throw new ErrorType(401, 'Token invalid');
    }
    const resultRole = LoginService.validate(resultToken);
    return res.status(200).json({ role: resultRole });
  }
}

export default LoginController;
