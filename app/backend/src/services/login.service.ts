import { compareSync } from 'bcryptjs';
import { ILoginBody } from '../interfaces';
import UsersModel from '../database/models/UsersModel';
import CustomError from '../utils/CustomError';
import { loginSchema } from './schemas/schemas';
import HandleJWT from '../utils/jwt';

export default class LoginService {
  // private handleValidationError = (errorCode:string) => {
  //   switch (errorCode) {
  //     case 'string.empty': throw new CustomError('All fields must be filled', 400);
  //     case 'any.required': throw new CustomError('All fields must be filled', 400);
  //     default: throw new CustomError('Incorrect email or password', 400);
  //   }
  // };

  private validateBody = (bodyParams: ILoginBody):void => {
    console.log(bodyParams);
    const { error } = loginSchema.validate(bodyParams);
    const errorCode = error?.details[0].type as string;
    console.log(errorCode);
    // if (error) { this.handleValidationError(errorCode); }
    if (error) { throw new CustomError('All fields must be filled', 400); }
  };

  private findUserData = async (email:string):Promise<UsersModel> => {
    const userData = await UsersModel.findOne({
      where: {
        email,
      },
    });
    return userData as UsersModel;
  };

  authenticateUser = (bodyParams:ILoginBody, userData: UsersModel):void => {
    const isEmailValid = !userData;
    if (isEmailValid) { throw new CustomError('Incorrect email or password', 401); }
    const isPasswordValid = !compareSync(bodyParams.password, userData.dataValues.password);
    console.log(isEmailValid);
    console.log(bodyParams.password);
    console.log(userData.dataValues.password);
    if (isPasswordValid) { throw new CustomError('Incorrect email or password', 401); }
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
