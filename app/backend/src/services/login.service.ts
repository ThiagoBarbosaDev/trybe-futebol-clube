import UsersModel from '../database/models/UsersModel';
import CustomError from '../utils/CustomError';
import { loginSchema } from './schemas/schemas';

interface bodyParams {
  email: string;
  password: string;
}

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
      case 'any.required': throw new CustomError('All fields must be filled', 400);
      default: throw new CustomError('Incorrect email or password', 401);
    }
  }

  private static validateBody(bodyParams: bodyParams):void {
    console.log('entrei');
    const { error } = loginSchema.validate(bodyParams);
    const errorCode = error?.details[0].type as string;
    if (error) { LoginService.handleValidationError(errorCode); }
  }

  login(bodyParams: bodyParams): string {
    const teste2 = this.teste;
    console.log(teste2);
    LoginService.validateBody(bodyParams);
    return 'retorno';
  }
}
