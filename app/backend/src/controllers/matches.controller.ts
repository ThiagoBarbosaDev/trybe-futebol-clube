import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class matchesController {
  constructor(private matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  async findAll(req:Request, res:Response): Promise<void> {
    // const bodyParams = req.body;
    const response = await this.matchesService.foobar();
    res.status(200).json({ message: response });
  }
}
