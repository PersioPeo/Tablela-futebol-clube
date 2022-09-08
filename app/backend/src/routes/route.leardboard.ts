import { Router } from 'express';
import ControllerLeardboard from '../controller/leardboard.controller';
import ServiceLeaderboard from '../services/leaderboardService';

const leaderboardRoute = Router();

const startService = new ServiceLeaderboard();
const startController = new ControllerLeardboard(startService);

leaderboardRoute.get('/home', startController.matchHome);
leaderboardRoute.get('/away', startController.matchAway);
leaderboardRoute.get('/', startController.matchAll);

export default leaderboardRoute;
