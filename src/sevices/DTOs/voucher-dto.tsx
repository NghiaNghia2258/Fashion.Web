import { OrderDto } from './order-dto';

export interface VoucherDto {
  id?: string;
  voucherCode?: string;
  title?: string;
  description?: string;
  discountPercent?: number;
  discountValue?: number;
  maxDiscountValue?: number;
  minOrderValue?: number;
  usageLimit?: number;
  usedCount?: number;
  startDate?: Date;
  expirationDate?: Date;
  createdAt?: Date;
  createdBy?: string;
  createdName?: string;

  orders?: OrderDto[];
}
