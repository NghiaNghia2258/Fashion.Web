import { ProductCategoryDto } from '../DTOs/product-category-dto';
import { ApiResult } from './api-result';
import * as axios from '../axios-instance/axios-host1';
import { URL } from '../constURL/constURL';

export default class ProductCategoryService {
  async GetAll(): Promise<ApiResult<ProductCategoryDto[]>> {
    const response = await axios.GET(URL.PRODUCTCATEGORY.GETALL);
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
