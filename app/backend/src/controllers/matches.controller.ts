import { Request, Response } from 'express';
import HandleJWT from '../utils/jwt';
import { MatchesService } from '../services';

export default class matchesController {
  constructor(private matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  private handleFilterByProgress = async (res:Response, isInProgress:string):Promise<Response> => {
    const response = await this.matchesService.findInProgress(isInProgress);
    return res.status(200).json(response);
  };

  async findAll(req:Request, res:Response): Promise<Response> {
    const { inProgress: isInProgress } = req.query;
    if (isInProgress) {
      return this.handleFilterByProgress(res, isInProgress as string);
    }
    const response = await this.matchesService.findAll();
    return res.status(200).json(response);
  }

  async insert(req:Request, res:Response): Promise<Response> {
    const { body: postPayload, headers: { authorization: token } } = req;
    HandleJWT.authenticate(token);
    const response = await this.matchesService.insert(postPayload);
    return res.status(201).json(response);
  }

  async finishMatch(req:Request, res:Response): Promise<Response> {
    const { params: { id } } = req;
    const response = await this.matchesService.finishMatch(id);
    return res.status(200).json(response);
  }

  async update(req:Request, res:Response): Promise<Response> {
    const { params: { id }, body: postPayload } = req;
    const response = await this.matchesService.update(id, postPayload);
    return res.status(200).json(response);
  }
}
