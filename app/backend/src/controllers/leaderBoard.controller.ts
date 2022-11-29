import { Request, Response } from 'express';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) {
    this.leaderBoardService = leaderBoardService;
  }

  async findAll(req:Request, res:Response): Promise<void> {
    // const bodyParams = req.body;
    const response = await this.leaderBoardService.foobar();
    res.status(200).json({ message: response });
  }
}
