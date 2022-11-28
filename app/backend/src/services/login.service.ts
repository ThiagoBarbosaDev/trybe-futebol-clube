import { compareSync } from 'bcryptjs';
import { ILoginBody } from '../interfaces';
import UsersModel from '../database/models/UsersModel';
import CustomError from '../utils/CustomError';
import { loginSchema } from './schemas/schemas';
import HandleJWT from '../utils/jwt';

export default class LoginService {
  private validateBody = (bodyParams: ILoginBody):void => {
    const { error } = loginSchema.validate(bodyParams);
    if (error) { throw new CustomError('All fields must be filled', 400); }
  };

  private findUserData = async (email:string):Promise<UsersModel> => {
    const userData = await UsersModel.findOne({ where: { email} });
    return userData as UsersModel;
  };

  authenticateUser = (bodyParams:ILoginBody, userData: UsersModel):void => {
    const isEmailInvalid = !userData;
    if (isEmailInvalid) { throw new CustomError('Incorrect email or password', 401); }
    const isPasswordInvalid = !compareSync(bodyParams.password, userData.dataValues.password);
    if (isPasswordInvalid) { throw new CustomError('Incorrect email or password', 401); }
  };

  authorizeUser = (bodyParams:ILoginBody):string => HandleJWT.createToken(bodyParams);

  login = async (bodyParams: ILoginBody): Promise<string> => {
    this.validateBody(bodyParams);
    const userData = await this.findUserData(bodyParams.email);
    this.authenticateUser(bodyParams, userData);
    const token = this.authorizeUser(bodyParams);
    return token;
  };
}
