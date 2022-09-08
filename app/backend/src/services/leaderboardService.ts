import Teams from '../database/models/team';

class ServiceLeaderboard {
  constructor(private teams = Teams) {
    this.teams = teams;
  }
}

export default ServiceLeaderboard;
