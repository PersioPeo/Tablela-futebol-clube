import Imatches, { ImatchReturn } from './interfaces/Imatches';
import Ileaderboard from './interfaces/Ileaderboard';

const ecVitoria = (type: string, matches: Imatches[]) => {
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

const ecEmpate = (matches: Imatches[]) => {
  const empate = matches.reduce((acc: number, curr: Imatches) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return empate;
};

const ecDerrota = (type: string, matches: Imatches[]) => {
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

const golsEmCasa = (matches: Imatches[]) => {
  const goalsFavor = matches.reduce(
    (acc: number, curr: Imatches) => acc + curr.homeTeamGoals,
    0,
  );
  return goalsFavor;
};

const golsFora = (matches: Imatches[]) => {
  const goalsContra = matches.reduce(
    (acc: number, curr: Imatches) => acc + curr.awayTeamGoals,
    0,
  );
  return goalsContra;
};

const calcularPontos = (type: string, matches: ImatchReturn[]) => {
  const vitoria = ecVitoria(type, matches);
  const empate = ecEmpate(matches);
  const pontos = vitoria * 3 + empate;
  return pontos;
};

// Critério de desempates

const classificacao = (x: Ileaderboard, y: Ileaderboard) => {
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

export default {
  ecVitoria,
  ecEmpate,
  ecDerrota,
  golsEmCasa,
  golsFora,
  calcularPontos,
  classificacao,
};
