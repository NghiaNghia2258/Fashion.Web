import { UserLoginDto } from '../DTOs/user-login-dto';
import { ApiResult } from './api-result';

export interface ResponseLogin {
  accessToken: string;
  resfreshToken: string;
}

export default class AuthenService {
  async Login(user: UserLoginDto): Promise<ApiResult<ResponseLogin>> {
    // TODO: Implement login logic here
    return {
      isSucceeded: true,
      data: {
        accessToken: 'access_token',
        resfreshToken: 'refresh_token',
      },
      message: 'Login successful',
    };
  }
}
