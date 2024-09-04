import { CustomerDto } from './customer-dto';
import { OrderDto } from './order-dto';

export interface RecipientsInformationDto {
  id?: string; // Tương ứng với EntityBase<Guid>
  customerId?: string; // Thuộc tính CustomerId, không thể null
  recipientsName?: string; // Thuộc tính RecipientsName, không thể null
  recipientsPhone?: string; // Thuộc tính RecipientsPhone, không thể null
  recipientsNote?: string; // Thuộc tính RecipientsNote, không thể null
  ward?: string; // Thuộc tính Ward, tùy chọn
  district?: string; // Thuộc tính District, tùy chọn
  city?: string; // Thuộc tính City, tùy chọn
  longitude?: string; // Thuộc tính Longiude, tùy chọn
  latitude?: string; // Thuộc tính Latitude, tùy chọn
  detail?: string; // Thuộc tính Detail, không thể null

  customer?: CustomerDto; // Đối tượng Customer, không thể null
  orders?: OrderDto[]; // Mảng các đối tượng Order, không thể null
}
