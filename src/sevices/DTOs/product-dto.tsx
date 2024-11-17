import { ProductCategoryDto } from './product-category-dto';
import { ProductImageDto } from './product-image-dto';
import { ProductRateDto } from './product-rate';
import { ProductVariantDto } from './product-variant-dto';

export interface ProductDto {
  id?: string;
  name?: string;
  nameEn?: string;
  description?: string;
  mainImageUrl?: string;
  totalInventory?: number;
  categoryId?: string;
  categoryName?: string;
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
  category?: ProductCategoryDto;
  productImages?: ProductImageDto[];
  productRates?: ProductRateDto[];
  productVariants?: ProductVariantDto[];

  isActive?: boolean;
}
