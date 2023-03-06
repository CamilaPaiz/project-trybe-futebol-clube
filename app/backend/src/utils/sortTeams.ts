import ILeaderBoardStatistic from '../interfaces/ILeaderBoardStatistic';

export default function sortLeaderboard(teamStatistic:ILeaderBoardStatistic[]) {
  return teamStatistic.sort((teamA, teamB) => {
    if (teamA.totalPoints !== teamB.totalPoints) {
      return teamB.totalPoints - teamA.totalPoints;
    }
    if (teamA.totalVictories !== teamB.totalVictories) {
      return teamB.totalVictories - teamA.totalVictories;
    }
    if (teamA.goalsBalance !== teamB.goalsBalance) {
      return teamB.goalsBalance - teamA.goalsBalance;
    }
    if (teamA.goalsFavor !== teamB.goalsFavor) {
      return teamB.goalsFavor - teamA.goalsFavor;
    }
    return teamA.goalsOwn - teamB.goalsOwn;
  });
}
