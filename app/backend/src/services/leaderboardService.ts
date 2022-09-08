/* eslint-disable import/no-named-as-default */
import { ImatchTeams } from '../util/interfaces/Imatches';
import Leaderboard from '../util/interfaces/Leaderboard';
import Matches from '../database/models/match';
import Teams from '../database/models/team';

import {
  classificacao,
  classificacaoEmCasa,
  classificacaoFora,
  placarTotal,
} from '../util/calculoPartidas';

class ServiceLeaderboard {
  constructor(private teams = Teams) {
    this.teams = teams;
  }

  async finishMatch(type: string): Promise<Leaderboard[]> {
    let leaderBoard: Leaderboard[] = [];
    const matches = await this.teams.findAll({
      include: [{ model: Matches, as: `${type}`, where: { inProgress: 0 } }],
    });
    const finish = matches as unknown as ImatchTeams[];
    if (type === 'teamHome') leaderBoard = finish.map(classificacaoEmCasa);
    if (type === 'teamAway') leaderBoard = finish.map(classificacaoFora);
    const orderLeaderBoard = leaderBoard.sort(classificacao);
    return orderLeaderBoard;
  }

  async finishAllMatches(): Promise<Leaderboard[]> {
    const matches = await this.teams.findAll({
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: 0 } },
        { model: Matches, as: 'teamAway', where: { inProgress: 0 } },
      ],
    });
    const finish = matches as unknown as ImatchTeams[];
    const leaderBoard = finish.map(placarTotal);
    const orderLeaderBoard = leaderBoard.sort(classificacao);
    return orderLeaderBoard;
  }
}

export default ServiceLeaderboard;
