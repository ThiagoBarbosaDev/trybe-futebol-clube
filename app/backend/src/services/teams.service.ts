import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  findAll = async ():Promise<TeamsModel[]> => {
    const response = await TeamsModel.findAll();
    return response;
  };

  findOne = async (id:string):Promise<TeamsModel | null> => {
    const response = await TeamsModel.findOne({ where: { id } });
    return response;
  };
}
