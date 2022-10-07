import Imatches, { ImatchUpdate } from '../util/interfaces/Imatches';
import Matches from '../database/models/match';
import Team from '../database/models/team';

class ServiceMatches {
  constructor(private matches = Matches) {
    this.matches = matches;
  }

  pegar = async (): Promise<Array<Imatches>> => {
    const jogos = this.matches.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return jogos as unknown as Imatches[];
  };

  criar = async (data: Imatches) => {
    const homeTeam = await this.matches.findOne({
      where: { id: data.homeTeam },
    });
    const awayTeam = await this.matches.findOne({
      where: { id: data.awayTeam },
    });
    if (data.homeTeam === data.awayTeam) {
      return 'sameteam';
    }
    if (!homeTeam || !awayTeam) return null;
    const result = await this.matches.create({ ...data, inProgress: true });
    return result;
  };

  rotaProgress = async (id: number) => {
    await this.matches.update({ inProgress: false }, { where: { id } });
  };

  rotaGoals = async (id: number, data: ImatchUpdate) => {
    await this.matches.update({ ...data }, { where: { id } });
  };
}

export default ServiceMatches;
