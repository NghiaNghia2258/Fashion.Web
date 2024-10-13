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
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTG9naW5JZCI6ImQ1NzhjYWRmLTljZWEtNGFjOC1mZmYwLTA4ZGNjNzE5MmNiMCIsIkZ1bGxOYW1lIjoiTmdoxKlhIE5naGlhIDIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDcmVhdGVfUHJvZHVjdCIsImV4cCI6MTc2MDI2NzQzNH0.wZpL2YtuLau_3fV4jHBiCr9DRVhmMI5sAV59uwoAj3c',
        resfreshToken: 'refresh_token',
      },
      message: 'Login successful',
    };
  }
}
