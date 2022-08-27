import { Router } from 'express';
import Login from '../validation/login';
import LoginController from '../controllers/loginController';

const loginRoute = Router();

const startLogin = new LoginController();

loginRoute.post('/', (req, res) => startLogin.login(req, res));
loginRoute.get('/validate', Login.TokenValidation);

export default loginRoute;
