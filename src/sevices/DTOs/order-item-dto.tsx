import { OrderDto } from './order-dto';
import { ProductVariantDto } from './product-variant-dto';

export interface OrderItemDto {
  id?: string;
  orderId?: string;
  productVariantId?: string;
  productVariantName?: string;
  imageUrl?: string;
  quantity?: number;
  unitPrice?: number;
  discountPercent?: number;
  discountValue?: number;
  isDeleted?: boolean;

  order?: OrderDto;
  productVariant?: ProductVariantDto;
}
