import { UserLoginDto } from './user-login-dto';

export interface EmployeeDto {
  id?: string; // Tương ứng với EntityBase<Guid>
  name?: string; // Thuộc tính Name, không thể null
  phone?: string; // Thuộc tính Phone, tùy chọn
  position?: string; // Thuộc tính Position, tùy chọn
  userLoginId?: string; // Thuộc tính UserLoginId, tùy chọn

  userLogin?: UserLoginDto; // Đối tượng UserLogin, tùy chọn
}
