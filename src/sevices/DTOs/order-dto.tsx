import { CustomerDto } from './customer-dto';
import { OrderItemDto } from './order-item-dto';
import { RecipientsInformationDto } from './recipients-information-dto';
import { VoucherDto } from './voucher-dto';

export interface OrderDto {
  id?: string;
  code?: string;
  name?: string;
  note?: string;
  customerNote?: string;
  paymentStatus?: string;
  tax?: number;
  discountPercent?: number;
  discountValue?: number;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  voucherId?: string;
  voucherCode?: string;
  recipientsInformationId?: string;
  totalPrice?: number;
  status?: number;
  createdAt?: Date;
  createdBy?: string;
  createdName?: string;
  updatedAt?: Date;
  updatedBy?: string;
  updatedName?: string;
  isDeleted?: boolean;
  deletedAt?: Date;
  deletedBy?: string;
  deletedName?: string;

  customer?: CustomerDto;
  orderItems?: OrderItemDto[];
  recipientsInformation?: RecipientsInformationDto;
  voucher?: VoucherDto;
}
