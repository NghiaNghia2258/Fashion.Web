import { OrderItemDto } from './order-item-dto';
import { ProductDto } from './product-dto';

export interface ProductVariantDto {
  id?: string;
  size?: string;
  color?: string;
  price?: number;
  imageUrl?: string;
  inventory?: number;
  productId?: string;
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
  orderItems?: OrderItemDto[];
  product?: ProductDto;
  fileImage?: File | null;
}
