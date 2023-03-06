import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardService';

const leaderBoardRoute = Router();
const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

leaderBoardRoute.get(
  '/leaderboard/home',

  (req:Request, res:Response) => leaderBoardController.getAll(req, res),
);

leaderBoardRoute.get(
  '/leaderboard/away',
  (req:Request, res:Response) => leaderBoardController.getAllAway(req, res),
);

export default leaderBoardRoute;
