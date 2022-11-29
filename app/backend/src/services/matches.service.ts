import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  findAll = async ():Promise<MatchesModel[]> => {
    const response = await MatchesModel.findAll();
    return response;
  };
}
