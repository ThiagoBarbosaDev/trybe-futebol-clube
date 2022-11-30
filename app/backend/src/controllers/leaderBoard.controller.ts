import { Request, Response } from 'express';
// import { LeaderBoardResponse } from '../interfaces';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) {
    this.leaderBoardService = leaderBoardService;
  }

  // async findHomeLeaderBoard(req:Request, res:Response): Promise<LeaderBoardResponse> {
  async findHomeLeaderBoard(req:Request, res:Response): Promise<any | void> {
    const response = await this.leaderBoardService.findHomeLeaderBoard();
    console.log('CONTROLLER');
    console.table(response);
    res.status(200).json(response);
  }
}
