import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class matchesController {
  constructor(private matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  private handleFilterByProgress = async (res:Response, isInProgress:string):Promise<Response> => {
    const response = await this.matchesService.findInProgress(isInProgress);
    return res.status(200).json(response);
  };

  async findAll(req:Request, res:Response): Promise<Response<void, Record<string, any>>> {
    const { inProgress: isInProgress } = req.query;
    const isFilteringByInProgress = isInProgress !== undefined;
    if (isFilteringByInProgress) {
      return this.handleFilterByProgress(res, isInProgress as string);
    }
    const response = await this.matchesService.findAll();
    return res.status(200).json(response);
  }
}
