import { Request, Response } from 'express';
import { LoginService } from '../services';

export default class LoginController {
  constructor(private loginService: LoginService) {
    this.loginService = loginService;
  }

  async login(req:Request, res:Response): Promise<void> {
    const bodyParams = req.body;
    const token = await this.loginService.login(bodyParams);
    res.status(200).json({ token });
  }
}
