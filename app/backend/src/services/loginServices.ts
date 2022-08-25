import Jwt from '../helps/token';
import users from '../database/models/users.model';
import ILogin from '../interface/ILogin';

class LoginService implements ILogin {
  constructor(private user = users) {
    this.user = user;
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<string | void> {
    const result = await this.user.findOne({ where: { email: data.email } });
    if (!result) {
      return 'null';
    }
    const token = Jwt.create(result);
    return token;
  }

  static validate(token: string) {
    const result = Jwt.verify(token);
    if (!result) {
      return 'null';
    }
    return result;
  }
}

export default LoginService;
