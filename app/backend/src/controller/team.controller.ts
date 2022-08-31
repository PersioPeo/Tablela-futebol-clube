import { Request, Response } from 'express';
import ServiceTeams from '../services/teamsService';

class ControllerTeam {
  serviceTeam = new ServiceTeams();

  pegar = async (req: Request, res: Response) => {
    const times = await this.serviceTeam.pegar();
    return res.status(200).json(times);
  };

  pegarPorId = async (req: Request, res: Response) => {
    const time = await this.serviceTeam.pegarPorId(+(req.params.id));
    if (!time) return res.status(404).json({ message: 'Team not found' });
    return res.status(200).json(time);
  };
}

export default ControllerTeam;
