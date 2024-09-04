import { OrderDto } from './order-dto';
import { ProductVariantDto } from './product-variant-dto';

export interface OrderItemDto {
  id?: string; // Tương ứng với EntityBase<Guid>
  orderId?: string; // Thuộc tính OrderId, tùy chọn
  productVariantId?: string; // Thuộc tính ProductVariantId, tùy chọn
  quantity?: number; // Thuộc tính Quantity, không thể null
  unitPrice?: number; // Thuộc tính UnitPrice, không thể null
  discountPercent?: number; // Thuộc tính DiscountPercent, tùy chọn
  discountValue?: number; // Thuộc tính DiscountValue, tùy chọn

  order?: OrderDto; // Đối tượng Order, tùy chọn
  productVariant?: ProductVariantDto; // Đối tượng ProductVariant, tùy chọn
}
