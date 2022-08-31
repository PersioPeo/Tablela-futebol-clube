import { Router } from 'express';
import LoginController from '../controller/login.controller';

const loginRoute = Router();

const login = new LoginController();

loginRoute.post('/', login.postLogin);
loginRoute.get('/validate', LoginController.validation);

export default loginRoute;
