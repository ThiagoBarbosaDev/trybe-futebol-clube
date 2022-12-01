import { IMatchesPost } from '../interfaces';
import MatchesModel from '../database/models/MatchesModel';
import CustomError from '../utils/CustomError';

export default class MatchesService {
  findAll = async ():Promise<MatchesModel[]> => {
    const response = await MatchesModel.findAll({ include: ['teamHome', 'teamAway'] });
    return response;
  };

  findOne = async (id:string):Promise<MatchesModel | null> => {
    const response = await MatchesModel.findOne({ where: { id } });
    return response;
  };

  findInProgress = async (isInProgress:string):Promise<MatchesModel[]> => {
    const isTrue = isInProgress === 'true';
    const response = await MatchesModel.findAll(
      { include: ['teamHome', 'teamAway'], where: { inProgress: isTrue } },
    );
    return response;
  };

  findHomeOrAwayData = async (homeOrAway:('teamHome' | 'teamAway')):Promise<MatchesModel[]> => {
    const response = await MatchesModel.findAll(
      { include: [homeOrAway], where: { inProgress: false } },
    );
    return response;
  };

  findLeaderBoardData = async ():Promise<MatchesModel[]> => {
    const response = await MatchesModel.findAll(
      { include: ['teamHome', 'teamAway'], where: { inProgress: false } },
    );
    return response;
  };

  insert = async (postPayload:IMatchesPost):Promise<IMatchesPost> => {
    await this.validateIds(postPayload);
    this.validateBusinessLogic(postPayload);
    const response = await MatchesModel.create({ ...postPayload, inProgress: true });
    return response.toJSON();
  };

  private validateIds = async (postPayload:IMatchesPost):Promise<void> => {
    const { homeTeam, awayTeam } = postPayload;
    const gameIdsPromises = [homeTeam, awayTeam].map(async (id) => this.findOne(String(id)));
    const results = await Promise.all(gameIdsPromises);
    const areThereInvalidIds = !results.every((result) => !!result);
    if (areThereInvalidIds) {
      throw new CustomError('There is no team with such id!', 404);
    }
  };

  private validateBusinessLogic = (postPayload:IMatchesPost):void => {
    const { homeTeam, awayTeam } = postPayload;
    const areIdsTheSame = homeTeam === awayTeam;
    if (areIdsTheSame) {
      throw new CustomError('It is not possible to create a match with two equal teams', 422);
    }
  };

  finishMatch = async (id:string):Promise<Record<string, string>> => {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
    return { message: 'finished' };
  };

  update = async (id:string, payload:Record<string, string>):Promise<string> => {
    await MatchesModel.update(payload, { where: { id } });
    return 'success!';
  };
}
