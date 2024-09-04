import { CustomerDto } from './customer-dto';
import { EmployeeDto } from './employee-dto';

export interface UserLoginDto {
  id?: string; // Tương ứng với EntityBase<Guid>
  username?: string; // Thuộc tính Username, không thể null
  password?: string; // Thuộc tính Password, không thể null
  roleGroupId?: string; // Thuộc tính RoleGroupId, không thể null

  customers?: CustomerDto[]; // Mảng các đối tượng Customer, không thể null
  employees?: EmployeeDto[]; // Mảng các đối tượng Employee, không thể null
}
