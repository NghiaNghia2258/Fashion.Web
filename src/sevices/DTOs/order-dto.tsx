import { CustomerDto } from './customer-dto';
import { OrderItemDto } from './order-item-dto';
import { RecipientsInformationDto } from './recipients-information-dto';
import { VoucherDto } from './voucher-dto';

export interface OrderDto {
  id?: string; // Tương ứng với EntityBase<Guid>
  note?: string; // Thuộc tính Note, tùy chọn
  customerNote?: string; // Thuộc tính CustomerNote, tùy chọn
  paymentStatus?: string; // Thuộc tính PaymentStatus, không thể null
  tax?: number; // Thuộc tính Tax, tùy chọn
  discountPercent?: number; // Thuộc tính DiscountPercent, tùy chọn
  discountValue?: number; // Thuộc tính DiscountValue, tùy chọn
  customerId?: string; // Thuộc tính CustomerId, tùy chọn
  voucherId?: string; // Thuộc tính VoucherId, tùy chọn
  recipientsInformationId?: string; // Thuộc tính RecipientsInformationId, tùy chọn
  createdAt?: Date; // Thuộc tính CreatedAt, tùy chọn
  createdBy?: string; // Thuộc tính CreatedBy, tùy chọn
  createdName?: string; // Thuộc tính CreatedName, tùy chọn
  updatedAt?: Date; // Thuộc tính UpdatedAt, tùy chọn
  updatedBy?: string; // Thuộc tính UpdatedBy, tùy chọn
  updatedName?: string; // Thuộc tính UpdatedName, tùy chọn
  isDeleted?: boolean; // Thuộc tính IsDeleted, tùy chọn
  deletedAt?: Date; // Thuộc tính DeletedAt, tùy chọn
  deletedBy?: string; // Thuộc tính DeletedBy, tùy chọn
  deletedName?: string; // Thuộc tính DeletedName, tùy chọn

  customer?: CustomerDto; // Đối tượng Customer, tùy chọn
  orderItems?: OrderItemDto[]; // Mảng các đối tượng OrderItem
  recipientsInformation?: RecipientsInformationDto; // Đối tượng RecipientsInformation, tùy chọn
  voucher?: VoucherDto; // Đối tượng Voucher, tùy chọn
}
