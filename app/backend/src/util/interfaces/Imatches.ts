export default interface Imatches {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: { teamName: string };
  teamAway?: { teamName: string };
}
export interface ImatchUpdate {
  homeTeamGoals?: number;
  awayTeamGoals?: number;
}
export interface ImatchReturn {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}
export interface ImatchTeams {
  id?: number;
  teamName: string;
  teamHome: ImatchReturn[];
  teamAway: ImatchReturn[];
}
