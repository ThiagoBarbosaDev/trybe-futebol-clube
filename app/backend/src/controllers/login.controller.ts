import { Request, Response } from 'express';
import { LoginService } from '../services';

export default class LoginController {
  constructor(private loginService: LoginService) {
    this.loginService = loginService;
  }

  login(req:Request, res:Response): void {
    const bodyParams = req.body;
    this.loginService.login(bodyParams);
    // LoginService.login(bodyParams);
    res.status(200).json({ message: 'token' });
  }
}
