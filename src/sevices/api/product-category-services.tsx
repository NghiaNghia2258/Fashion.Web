import { ProductCategoryDto } from '../DTOs/product-category-dto';
import { ApiResult } from './api-result';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default class ProductCategoryService {
  async GetAll(): Promise<ApiResult<ProductCategoryDto[]>> {
    await delay(100);
    const response = {
      isSucceeded: true,
      message: '',
      data: [
        {
          id: '1',
          name: 'Category 1',
        },
        {
          id: '2',
          name: 'Category 2',
        },
        {
          id: '3',
          name: 'Category 3',
        },
        {
          id: '4',
          name: 'Sản phẩm mùa đông',
        },
      ],
      totalRecordsCount: 30,
    };
    if (response.isSucceeded) {
      return {
        isSucceeded: true,
        data: response.data,
        totalRecordsCount: response.totalRecordsCount,
      };
    }
    return {
      isSucceeded: false,
      message: response.message,
      data: [],
      totalRecordsCount: 0,
    };
  }
}
