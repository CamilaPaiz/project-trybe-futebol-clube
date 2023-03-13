import { ModelStatic } from 'sequelize';
import calculateEfficiency from '../utils/calculateEfficiency';
import { calculatePoints, calculatePointsAway,
  calculateTeamPoints } from '../utils/calculatePoints';

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
      efficiency: '',
    }));
    return teamsStatistic;
  }

  async calculatePointsHome(): Promise<ILeaderBoardStatistic[]> {
    const matches = await this.getAll();
    const teamsStatistic = await this.teamNewObj();
    matches.forEach((el) => {
      const homeTeam = teamsStatistic.find((team) => team.name === el.dataValues.homeTeam.teamName);
      if (homeTeam) calculatePoints(homeTeam, el);
    });
    const efficiencyMap = teamsStatistic.map((team) => {
      const efficiency = calculateEfficiency(team.totalPoints, team.totalGames);
      return { ...team, efficiency };
    });
    return efficiencyMap;
  }

  async calculatePointsAway(): Promise<ILeaderBoardStatistic[]> {
    const matches = await this.getAll();
    const teamsStatistic = await this.teamNewObj();
    matches.forEach((el) => {
      const awayTeam = teamsStatistic.find((team) => team.name === el.dataValues.awayTeam.teamName);
      if (awayTeam) calculatePointsAway(awayTeam, el);
    });
    const efficiencyMap = teamsStatistic.map((team) => {
      const efficiency = calculateEfficiency(team.totalPoints, team.totalGames);
      return { ...team, efficiency };
    });
    return efficiencyMap;
  }

  async calculateTotalPoints(): Promise<ILeaderBoardStatistic[]> {
    const homeTeams = await this.calculatePointsHome();
    const awayTeams = await this.calculatePointsAway();

    const teamsStatistic = homeTeams.map((team) => {
      const awayTeam = awayTeams.find((t) => t.name === team.name);
      if (awayTeam) {
        calculateTeamPoints(team, awayTeam);
      }
      const efficiency = calculateEfficiency(team.totalPoints, team.totalGames);
      return { ...team, efficiency };
    });

    return teamsStatistic;
  }
}
