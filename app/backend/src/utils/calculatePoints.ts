import IMatches from '../interfaces/IMatches';
import ILeaderBoardStatistic from '../interfaces/ILeaderBoardStatistic';

export function calculatePoints(team:ILeaderBoardStatistic, el:IMatches) {
  const homeTeam = team;
  if (el.homeTeamGoals > el.awayTeamGoals) {
    homeTeam.totalPoints += 3;
    homeTeam.totalVictories += 1;
  } else if (el.homeTeamGoals === el.awayTeamGoals) {
    homeTeam.totalPoints += 1;
    homeTeam.totalDraws += 1;
  } else {
    homeTeam.totalLosses += 1;
  }
  homeTeam.totalGames += 1;
  homeTeam.goalsFavor += el.homeTeamGoals;
  homeTeam.goalsOwn += el.awayTeamGoals;
  homeTeam.goalsBalance = homeTeam.goalsFavor - homeTeam.goalsOwn;
  return homeTeam;
}

export function calculatePointsAway(team:ILeaderBoardStatistic, el:IMatches) {
  const awayTeam = team;
  if (el.homeTeamGoals < el.awayTeamGoals) {
    awayTeam.totalPoints += 3;
    awayTeam.totalVictories += 1;
  } else if (el.homeTeamGoals === el.awayTeamGoals) {
    awayTeam.totalPoints += 1;
    awayTeam.totalDraws += 1;
  } else {
    awayTeam.totalLosses += 1;
  }
  awayTeam.totalGames += 1;
  awayTeam.goalsFavor += el.awayTeamGoals;
  awayTeam.goalsOwn += el.homeTeamGoals;
  awayTeam.goalsBalance = awayTeam.goalsFavor - awayTeam.goalsOwn;
  return awayTeam;
}

export function calculateTeamPoints(Team:ILeaderBoardStatistic, awayTeam:ILeaderBoardStatistic) {
  const team = Team;
  team.totalPoints += awayTeam.totalPoints;
  team.totalGames += awayTeam.totalGames;
  team.totalVictories += awayTeam.totalVictories;
  team.totalDraws += awayTeam.totalDraws;
  team.totalLosses += awayTeam.totalLosses;
  team.goalsFavor += awayTeam.goalsFavor;
  team.goalsOwn += awayTeam.goalsOwn;
  team.goalsBalance += awayTeam.goalsBalance;
  return awayTeam;
}
