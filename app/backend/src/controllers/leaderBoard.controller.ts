import { Request, Response } from 'express';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) {
    this.leaderBoardService = leaderBoardService;
  }

  async findHomeLeaderBoard(req:Request, res:Response): Promise<void> {
    const response = await this.leaderBoardService.findHomeLeaderBoard();
    res.status(200).json(response);
  }

  async findAwayLeaderBoard(req:Request, res:Response): Promise<void> {
    const response = await this.leaderBoardService.findAwayLeaderBoard();
    res.status(200).json(response);
  }

  async findCompleteLeaderBoard(req:Request, res:Response): Promise<void> {
    const response = await this.leaderBoardService.findCompleteLeaderBoard();
    res.status(200).json(response);
  }
}
