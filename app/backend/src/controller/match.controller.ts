import { NextFunction, Request, Response } from 'express';
import ErrorType from '../util/middleware/ErrorType';
import ServiceMatches from '../services/matchesServive';
import Jwt from '../util/token/jwt';

class ControllerMatches {
  matches = new ServiceMatches();

  pegar = async (_req: Request, res: Response) => {
    const resp = await this.matches.pegar();
    return res.status(200).json(resp);
  };

  criar = async (req: Request, res: Response) => {
    const resp = await this.matches.criar(req.body);
    if (!resp) throw new ErrorType(404, 'There is no team with such id!');
    if (resp === 'sameteam') {
      throw new ErrorType(
        401,
        'It is not possible to create a match with two equal teams',
      );
    }
    return res.status(201).json(resp);
  };

  rotaProgress = async (req: Request, res: Response) => {
    await this.matches.rotaProgress(+req.params.id);
    res.status(200).json({ message: 'Finished' });
  };

  rotaGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matches.rotaGoals(+id, req.body);
    res.status(200).json({ message: 'Goals update' });
  };

  static tokenValida = (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new ErrorType(401, 'Token must be a valid token');
    }
    if (token) {
      const payload = Jwt.verify(token);
      if (!payload || payload === null) {
        throw new ErrorType(401, 'Token must be a valid token');
      }
    }
    next();
  };
}

export default ControllerMatches;
