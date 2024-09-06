import { OrderDto } from './order-dto';

export interface VoucherDto {
  id?: string;
  voucherCode?: string;
  discountPercent?: number;
  discountValue?: number;
  redemptions?: number;
  expirationDate: Date;
  createdAt?: Date;
  createdBy?: string;
  createdName?: string;

  orders?: OrderDto[];
}
