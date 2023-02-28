import { Router, Request, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const loginRoute = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);
loginRoute.post('/login', (req:Request, res:Response) => loginController.createLogin(req, res));

export default loginRoute;
