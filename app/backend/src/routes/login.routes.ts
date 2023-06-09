import { Router } from 'express';
import { LoginService } from '../services';
import { LoginController } from '../controllers';

const loginRouter = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.route('/').post((req, res) => loginController.login(req, res));
loginRouter.route('/validate').get((req, res) => loginController.validate(req, res));

export default loginRouter;
