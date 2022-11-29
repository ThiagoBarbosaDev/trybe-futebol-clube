import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  findAll = async () => {
    const response = await TeamsModel.findAll();
    console.log('service');
    return response;
  };
}
