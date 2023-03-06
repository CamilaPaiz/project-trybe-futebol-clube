import IMatches from '../interfaces/IMatches';
import ILeaderBoardStatistic from '../interfaces/ILeaderBoardStatistic';

export default function calculatePoints(team:ILeaderBoardStatistic, el:IMatches) {
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
