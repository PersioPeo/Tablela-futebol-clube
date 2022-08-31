import Teams from '../database/models/team';

class ServiceTeams {
  constructor(private team = Teams) {
    this.team = team;
  }

  pegar = async (): Promise<Array<{
    id: number,
    teamName: string,
  }>> => {
    const result = await this.team.findAll({ raw: true });
    return result;
  };

  pegarPorId = async (id: number): Promise<{
    id: number,
    teamName: string,
  } | null> => {
    const result = await this.team.findOne({ where: { id } });
    return result;
  };
}

export default ServiceTeams;
