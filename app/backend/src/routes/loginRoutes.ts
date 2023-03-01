import { Router, Request, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import validateEmail from '../middlewares/validateEmail';
import validatePassword from '../middlewares/validatePassword';

const loginRoute = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);
loginRoute.post(
  '/login',
  validateEmail,
  validatePassword,
  (req:Request, res:Response) => loginController.createLogin(req, res),
);

export default loginRoute;
