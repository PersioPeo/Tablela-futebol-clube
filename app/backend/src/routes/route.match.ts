import { Router } from 'express';
import ControllerMatches from '../controller/match.controller';

const matchesRoute = Router();

const startMatches = new ControllerMatches();

matchesRoute.get('/', startMatches.pegar);
matchesRoute.post('/', ControllerMatches.jwtValidation, startMatches.criar);
matchesRoute.patch('/:id/finish', startMatches.rotaProgress);
matchesRoute.patch('/:id', startMatches.rotaGoals);

export default matchesRoute;
