import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRoute = Router();

const startLogin = new LoginController();

loginRoute.post('/', (req, res) => startLogin.login(req, res));

export default loginRoute;

