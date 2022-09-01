import { Router } from 'express';
import ControllerMatches from '../controller/match.controller';

const matchesRoute = Router();

const startMatches = new ControllerMatches();

matchesRoute.get('/', startMatches.pegar);
matchesRoute.post('/', ControllerMatches.tokenValida, startMatches.criar);
matchesRoute.patch('/:id/finish', ControllerMatches.tokenValida, startMatches.rotaProgress);
matchesRoute.patch('/:id', ControllerMatches.tokenValida, startMatches.rotaGoals);

export default matchesRoute;
