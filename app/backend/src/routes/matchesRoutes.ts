import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const matchesRoute = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRoute.get(
  '/matches',

  (req:Request, res:Response) => matchesController.getAll(req, res),
);
export default matchesRoute;
