import { ILoginBody } from '../interfaces';
import UsersModel from '../database/models/UsersModel';
import CustomError from '../utils/CustomError';
import { loginSchema } from './schemas/schemas';

export default class LoginService {
  private usersModel: UsersModel;
  teste = 'teste';

  constructor(usersModel: UsersModel) {
    this.usersModel = usersModel;
  }

  private static handleValidationError(
    errorCode:string,
  ) {
    switch (errorCode) {
      case 'string.empty': throw new CustomError('All fields must be filled', 400);
      case 'any.required': throw new CustomError('All fields must be filled', 400);
      default: throw new CustomError('Incorrect email or password', 400);
    }
  }

  private static validateBody(bodyParams: ILoginBody):void {
    console.log(bodyParams);
    const { error } = loginSchema.validate(bodyParams);
    const errorCode = error?.details[0].type as string;
    console.log(errorCode);
    if (error) { LoginService.handleValidationError(errorCode); }
  }

  login(bodyParams: ILoginBody): string {
    const teste2 = this.teste;
    console.log(teste2);
    LoginService.validateBody(bodyParams);
    return 'retorno';
  }
}
