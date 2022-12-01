import { Request, Response } from 'express';
import { TeamsService } from '../services';

export default class TeamsController {
  constructor(private teamsService: TeamsService) {
    this.teamsService = teamsService;
  }

  async findAll(req:Request, res:Response): Promise<void> {
    const response = await this.teamsService.findAll();
    res.status(200).json(response);
  }

  async findOne(req:Request, res:Response): Promise<void> {
    const { id } = req.params;
    const response = await this.teamsService.findOne(id);
    res.status(200).json(response);
  }
}
