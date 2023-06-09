import { compareSync } from 'bcryptjs';
import { ILoginBody } from '../interfaces';
import UsersModel from '../database/models/UsersModel';
import CustomError from '../utils/CustomError';
import { loginSchema } from './schemas/schemas';
import HandleJWT from '../utils/jwt';

const INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password';
export default class LoginService {
  private validateBody = (bodyParams: ILoginBody):void => {
    const { error } = loginSchema.validate(bodyParams);
    if (error) { throw new CustomError('All fields must be filled', 400); }
  };

  private findUserData = async (email:string):Promise<UsersModel> => {
    const userData = await UsersModel.findOne({ where: { email } });
    return userData as UsersModel;
  };

  authenticateUser = async (bodyParams:ILoginBody, userData: UsersModel):Promise<void> => {
    if (!userData) { throw new CustomError(INCORRECT_EMAIL_OR_PASSWORD, 401); }
    const isPasswordInvalid = !compareSync(bodyParams.password, userData.password);
    if (isPasswordInvalid) { throw new CustomError(INCORRECT_EMAIL_OR_PASSWORD, 401); }
  };

  authorizeUser = (bodyParams:ILoginBody):string => HandleJWT.createToken(bodyParams);

  login = async (bodyParams: ILoginBody): Promise<string> => {
    this.validateBody(bodyParams);
    const userData = await this.findUserData(bodyParams.email);
    await this.authenticateUser(bodyParams, userData);
    const token = this.authorizeUser(bodyParams);
    return token;
  };

  validate = async (authToken:string):Promise<Record<string, string>> => {
    // todo: implement authToken validation
    const email = HandleJWT.verifyRole(authToken);
    const { role } = await this.findUserData(email);
    return { role };
  };
}
