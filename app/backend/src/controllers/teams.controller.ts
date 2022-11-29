import { Request, Response } from 'express';
import { TeamsService } from '../services';

export default class TeamsController {
  constructor(private teamsService: TeamsService) {
    this.teamsService = teamsService;
  }

  async findAll(req:Request, res:Response): Promise<void> {
    // const bodyParams = req.body;
    const response = await this.teamsService.findAll();
    res.status(200).json(response);
  }
}
