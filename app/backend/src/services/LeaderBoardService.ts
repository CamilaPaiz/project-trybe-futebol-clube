import { ModelStatic } from 'sequelize';
/* import ITeam from '../interfaces/ITeam'; */

import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import ILeaderBoardStatistic from '../interfaces/ILeaderBoardStatistic';

export default class LeaderBoardService {
  protected model: ModelStatic<Matches> = Matches;
  protected model2: ModelStatic<Teams> = Teams;

  async getAll():Promise<Matches[]> {
    const match = await this.model.findAll({
      where: { inProgress: false },
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return match;
  }

  async teamNewObj():Promise<ILeaderBoardStatistic[]> {
    const teams = await this.model2.findAll();

    const teamsStatistic = teams.map((team) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
    return teamsStatistic;
  }

  async calculatePointsHome(): Promise<ILeaderBoardStatistic[]> {
    const matches = await this.getAll();
    const teamsStatistic = await this.teamNewObj();
    matches.forEach((el) => {
      const homeTeam = teamsStatistic.find((team) => team.name === el.dataValues.homeTeam.teamName);
      if (homeTeam) {
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
      }
    });
    return teamsStatistic;
  }

  async calculateGoals() : Promise<ILeaderBoardStatistic[]> {
    const matches = await this.getAll();
    const teamsStatistic = await this.calculatePointsHome();
    matches.forEach((el) => {
      const homeTeam = teamsStatistic.find((team) => team.name === el.dataValues.homeTeam.teamName);
      if (homeTeam) {
        const homeTeamGoalScored = el.homeTeamGoals ? 1 : 0;
        const awayTeamGoalScored = el.awayTeamGoals ? 1 : 0;
        homeTeam.goalsFavor += homeTeamGoalScored;
        homeTeam.goalsOwn += awayTeamGoalScored;
        homeTeam.goalsBalance = homeTeam.goalsFavor - homeTeam.goalsOwn;
      }
    });
    return teamsStatistic;
  }

  async calculateEfficiency():Promise<ILeaderBoardStatistic[]> {
    const matches = await this.getAll();
    const teamsStatistic = await this.calculateGoals();
    matches.forEach((el) => {
      const homeTeam = teamsStatistic.find((team) => team.name === el.dataValues.homeTeam.teamName);
      if (homeTeam) {
        const statistic = (homeTeam.totalPoints / (homeTeam.totalGames * 3)) * 100;
        homeTeam.efficiency = Number(statistic.toFixed(2));
      }
    });
    return teamsStatistic;
  }
}
