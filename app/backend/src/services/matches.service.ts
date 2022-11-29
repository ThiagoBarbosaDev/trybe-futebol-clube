import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  findAll = async ():Promise<MatchesModel[]> => {
    const response = await MatchesModel.findAll({ include: ['teamHome', 'teamAway'] });
    return response;
  };

  findInProgress = async (isInProgress:string):Promise<MatchesModel[]> => {
    const isTrue = isInProgress === 'true';
    const response = await MatchesModel.findAll(
      { include: ['teamHome', 'teamAway'], where: { inProgress: isTrue } },
    );
    return response;
  };
}
