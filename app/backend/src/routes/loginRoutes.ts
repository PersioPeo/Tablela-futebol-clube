import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRoute = Router();

const startLogin = new LoginController();

loginRoute.post('/', (req, res) => startLogin.login(req, res));
loginRoute.get('/validate', LoginController.tokenValidation);

export default loginRoute;
