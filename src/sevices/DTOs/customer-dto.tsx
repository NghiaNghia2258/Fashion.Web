import { OrderDto } from './order-dto';
import { ProductRateDto } from './product-rate';
import { RecipientsInformationDto } from './recipients-information-dto';
import { UserLoginDto } from './user-login-dto';

export interface CustomerDto {
  id?: string; // Tương ứng với EntityBase<Guid>
  name?: string; // Thuộc tính Name, không thể null
  phone?: string; // Thuộc tính Phone, tùy chọn
  gender?: string; // Thuộc tính Gender, không thể null
  point?: number; // Thuộc tính Point, tùy chọn
  userLoginId?: string; // Thuộc tính UserLoginId, tùy chọn
  isDeleted?: boolean; // Thuộc tính IsDeleted, tùy chọn
  deletedAt?: Date; // Thuộc tính DeletedAt, tùy chọn
  deletedBy?: string; // Thuộc tính DeletedBy, tùy chọn
  deletedName?: string; // Thuộc tính DeletedName, tùy chọn

  productRates?: ProductRateDto[]; // Mảng các đối tượng ProductRate
  recipientsInformations?: RecipientsInformationDto[]; // Mảng các đối tượng RecipientsInformation
  orders?: OrderDto[]; // Mảng các đối tượng Order

  userLogin?: UserLoginDto; // Đối tượng UserLogin, tùy chọn
}
