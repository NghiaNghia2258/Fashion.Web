import { CustomerDto } from './customer-dto';
import { ProductDto } from './product-dto';

export interface ProductRateDto {
  id?: string;
  productId?: string;
  customerId?: string;
  rating?: number;
  review?: string;
  customer?: CustomerDto;
  product?: ProductDto;
}
