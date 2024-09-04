import { ProductDto } from './product-dto';

export interface ProductImageDto {
  id?: string; // Tương ứng với EntityBase<Guid>
  imageUrl?: string; // Thuộc tính ImageUrl
  productId?: string; // Tùy chọn (có thể null)
  product?: ProductDto; // Tùy chọn (có thể null)
}
