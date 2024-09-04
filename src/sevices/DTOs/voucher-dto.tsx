import { OrderDto } from './order-dto';

export interface VoucherDto {
  id?: string; // Tương ứng với EntityBase<Guid>
  voucherCode?: string; // Thuộc tính VoucherCode, không thể null
  discountPercent?: number; // Thuộc tính DiscountPercent, có thể null
  discountValue?: number; // Thuộc tính DiscountValue, có thể null
  redemptions?: number; // Thuộc tính Redemptions, có thể null
  expirationDate: Date; // Thuộc tính ExpirationDate, không thể null
  createdAt?: Date; // Thuộc tính CreatedAt, có thể null
  createdBy?: string; // Thuộc tính CreatedBy, có thể null
  createdName?: string; // Thuộc tính CreatedName, có thể null

  orders?: OrderDto[]; // Mảng các đối tượng Order, không thể null
}
