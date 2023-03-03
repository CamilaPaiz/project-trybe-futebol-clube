import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import validateToken from '../middlewares/validateToken';

const matchesRoute = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRoute.get(
  '/matches',

  (req:Request, res:Response) => matchesController.getAll(req, res),
);
matchesRoute.patch(
  '/matches/:id/finish',
  validateToken,
  (req:Request, res:Response) => matchesController.update(req, res),
);
matchesRoute.patch(
  '/matches/:id',
  validateToken,
  (req:Request, res:Response) => matchesController.updateMatch(req, res),
);
export default matchesRoute;
