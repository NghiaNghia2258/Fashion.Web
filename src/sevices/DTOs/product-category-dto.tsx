import { ProductDto } from './product-dto';

export interface ProductCategoryDto {
  id?: string;
  name?: string;
  products?: ProductDto[];
}
