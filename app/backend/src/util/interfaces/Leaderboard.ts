export default interface iLeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export type arriLead = Array<iLeaderboard> | void;

export interface Leaderboard {
  finishMatch(type: string): Promise<arriLead>;
  finishAllMatches(): Promise<arriLead>;
}
