/* eslint-disable import/no-named-as-default */
import Imatches, { ImatchReturn, ImatchTeams } from './interfaces/Imatches';
import Leaderboard from './interfaces/Leaderboard';

export const ecVitoria = (type: string, matches: Imatches[]) => {
  let vitoria = 0;

  if (type === 'teamHome') {
    vitoria = matches.reduce((acc: number, curr: Imatches) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  if (type === 'teamAway') {
    vitoria = matches.reduce((acc: number, curr: Imatches) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  return vitoria;
};

export const ecEmpate = (matches: Imatches[]) => {
  const empate = matches.reduce((acc: number, curr: Imatches) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return empate;
};

export const ecDerrota = (type: string, matches: Imatches[]) => {
  let derrota = 0;
  if (type === 'teamHome') {
    derrota = matches.reduce((acc: number, curr: Imatches) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }
  if (type === 'teamAway') {
    derrota = matches.reduce((acc: number, curr: Imatches) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }
  return derrota;
};

export const golsEmCasa = (matches: Imatches[]) => {
  const goalsFavor = matches.reduce(
    (acc: number, curr: Imatches) => acc + curr.homeTeamGoals,
    0,
  );
  return goalsFavor;
};

export const golsFora = (matches: Imatches[]) => {
  const goalsContra = matches.reduce(
    (acc: number, curr: Imatches) => acc + curr.awayTeamGoals,
    0,
  );
  return goalsContra;
};

export const calcularPontos = (type: string, matches: ImatchReturn[]) => {
  const vitoria = ecVitoria(type, matches);
  const empate = ecEmpate(matches);
  const pontos = vitoria * 3 + empate;
  return pontos;
};

// Critério de desempates

export const classificacao = (x: Leaderboard, y: Leaderboard) => {
  if (x.totalPoints < y.totalPoints) return 1;
  if (x.totalPoints > y.totalPoints) return -1;

  if (x.totalVictories < y.totalVictories) return 1;
  if (x.totalVictories > y.totalVictories) return -1;

  if (x.goalsBalance < y.goalsBalance) return 1;
  if (x.goalsBalance > y.goalsBalance) return -1;

  if (x.goalsFavor < y.goalsFavor) return 1;
  if (x.goalsFavor > y.goalsFavor) return -1;

  if (x.goalsOwn < y.goalsOwn) return 1;
  if (x.goalsOwn > y.goalsOwn) return -1;

  return 0;
};

export const classificacaoEmCasa = ({ teamName, teamHome }: ImatchTeams) => ({
  name: teamName,
  totalPoints: calcularPontos('teamHome', teamHome),
  totalGames: teamHome.length,
  totalVictories: ecVitoria('teamHome', teamHome),
  totalDraws: ecEmpate(teamHome),
  totalLosses: ecDerrota('teamHome', teamHome),
  goalsFavor: golsEmCasa(teamHome),
  goalsOwn: golsFora(teamHome),
  goalsBalance: golsEmCasa(teamHome) - golsFora(teamHome),
  efficiency: +(
    (calcularPontos('teamHome', teamHome) / (teamHome.length * 3))
    * 100
  ).toFixed(2),
});

export const classificacaoFora = ({ teamName, teamAway }: ImatchTeams) => ({
  name: teamName,
  totalPoints: calcularPontos('teamAway', teamAway),
  totalGames: teamAway.length,
  totalVictories: ecVitoria('teamAway', teamAway),
  totalDraws: ecEmpate(teamAway),
  totalLosses: ecDerrota('teamAway', teamAway),
  goalsFavor: golsEmCasa(teamAway),
  goalsOwn: golsFora(teamAway),
  goalsBalance: golsEmCasa(teamAway) - golsFora(teamAway),
  efficiency: +(
    (calcularPontos('teamAway', teamAway) / (teamAway.length * 3))
    * 100
  ).toFixed(2),
});

const eficiencia = (teamHome: ImatchReturn[], teamAway: ImatchReturn[]) => {
  const point = calcularPontos('teamAway', teamAway) + calcularPontos('teamHome', teamHome);
  const matchs = (teamHome.length + teamAway.length) * 3;
  const eff = Number(((point / matchs) * 100).toFixed(2));
  return eff;
};

export const placarTotal = ({ teamName, teamHome, teamAway }: ImatchTeams) => ({
  name: teamName,
  totalPoints:
    calcularPontos('teamAway', teamAway) + calcularPontos('teamHome', teamHome),
  totalGames: teamAway.length + teamHome.length,
  totalVictories:
    ecVitoria('teamAway', teamAway) + ecVitoria('teamHome', teamHome),
  totalDraws: ecEmpate(teamAway) + ecEmpate(teamHome),
  totalLosses:
    ecDerrota('teamAway', teamAway) + ecDerrota('teamHome', teamHome),
  goalsFavor: golsEmCasa(teamHome) + golsFora(teamAway),
  goalsOwn: golsEmCasa(teamAway) + golsFora(teamHome),
  goalsBalance:
    golsFora(teamAway)
    - golsEmCasa(teamAway)
    + golsEmCasa(teamHome)
    - golsFora(teamHome),
  efficiency: eficiencia(teamHome, teamAway),
});
