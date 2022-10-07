import Ilogin, { DATA } from '../util/interfaces/Ilogin';
import Users from '../database/models/users';
import Jwt from '../util/token/jwt';

class ServiceLogin implements Ilogin {
  constructor(private user = Users) {
    this.user = user;
  }

  login = async (data: DATA): Promise<string | void> => {
    const result = await this.user.findOne({ where: { email: data.email } });
    if (!result) return 'null';
    const token = Jwt.create(result);
    return token;
  };

  static validate(token: string) {
    const result = Jwt.verify(token);
    if (!result) {
      return 'null';
    }
    return result;
  }
}

export default ServiceLogin;
