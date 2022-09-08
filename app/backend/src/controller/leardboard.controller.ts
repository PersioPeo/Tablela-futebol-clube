import { Request, Response } from 'express';
import { Leaderboard } from '../util/interfaces/Leaderboard';

class ControllerLeardboard {
  constructor(private service: Leaderboard) {
    this.service = service;
  }

  matchHome = async (_req: Request, res: Response) => {
    const result = await this.service.finishMatch('teamHome');
    return res.status(200).json(result);
  };

  matchAway = async (_req: Request, res: Response) => {
    const result = await this.service.finishMatch('teamAway');
    return res.status(200).json(result);
  };

  matchAll = async (_req: Request, res: Response) => {
    const result = await this.service.finishAllMatches();
    return res.status(200).json(result);
  };
}

export default ControllerLeardboard;
