import { Router } from 'express';
import ControllerTeam from '../controller/team.controller';

const teamRoute = Router();

const startController = new ControllerTeam();

teamRoute.get('/:id', startController.pegarPorId);
teamRoute.get('/', startController.pegar);

export default teamRoute;
