import { Request, Response } from 'express';
import ServiceLogin from '../service/loginservice';
import ErrorType from '../util/middleware/ErrorType';

class LoginController {
  svc = new ServiceLogin();

  postLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!password || !email) throw new ErrorType(400, 'All fields must be filled');

    const token = await this.svc.login(req.body);
    if (token === 'null') throw new ErrorType(401, 'Incorrect email or password');
    return res.status(200).json({ token });
  };

  static async validation(req: Request, res: Response) {
    const result = req.headers.authorization;
    if (!result) throw new ErrorType(401, 'Token invalid');
    const role = ServiceLogin.validate(result);
    return res.status(200).json({ role });
  }
}

export default LoginController;
