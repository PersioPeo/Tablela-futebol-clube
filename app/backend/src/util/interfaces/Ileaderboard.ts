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
export type pontos = Array<iLeaderboard> | void;
export interface Leaderboard {
  finishMatch(type: string): Promise<pontos>;
  finishAllMatches(): Promise<pontos>;
}
