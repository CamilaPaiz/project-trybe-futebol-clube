import { Router, Request, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import validateEmail from '../middlewares/validateEmail';
import validatePassword from '../middlewares/validatePassword';
import checkUserExists from '../middlewares/checkUserExist';
import validateToken from '../middlewares/validateToken';

const loginRoute = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);
loginRoute.post(
  '/login',
  validateEmail,
  validatePassword,
  checkUserExists,
  (req:Request, res:Response) => loginController.createLogin(req, res),
);
loginRoute.get(
  '/login/role',
  validateToken,

  (req:Request, res:Response) => LoginController.getLogin(req, res),
);
export default loginRoute;
