import { ProductVariantDto } from '../DTOs/product-variant-dto';
import { ApiResult } from './api-result';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default class ProductVariantService {
  async GetByProductId(productId: string | undefined): Promise<ApiResult<ProductVariantDto[]>> {
    console.log(productId);
    await delay(1000);
    // Implement logic to fetch product variants from API or database
    return {
      isSucceeded: true,
      message: '',
      data: [
        {
          id: '101',
          size: 'M',
          color: 'Red',
          price: 199999,
          imageUrl:
            'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
          inventory: 0,
        },
        {
          id: '102',
          size: 'L',
          color: 'Blue',
          price: 229999,
          imageUrl:
            'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
          inventory: 30,
        },
      ],
    };
  }
}
