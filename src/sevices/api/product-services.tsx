import { ProductDto } from '../DTOs/product-dto';
import { ProductVariantDto } from '../DTOs/product-variant-dto';
import { OptionFilterProduct } from '../paramas/option-filter-product';
import { ApiResult } from './api-result';
import { URL } from '../constURL/constURL';

import * as axios from '../axios-instance/axios-host1';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class ProductService {
  async GetAll(options: OptionFilterProduct): Promise<ApiResult<ProductDto[]>> {
    const response = await axios.GET(URL.PRODUCT.GETALL, {
      params: options,
    });
    if (response.isSucceeded) {
      return {
        isSucceeded: true,
        data: response.data,
        totalRecordsCount: response.totalRecordsCount,
      };
    }
    return {
      isSucceeded: false,
      data: [],
      totalRecordsCount: 0,
      message: response.message,
    };
  }

  async GetById(id: string): Promise<ApiResult<ProductDto>> {
    const response = await axios.GET(`${URL.PRODUCT.GETONE}/${id}`);
    if (response.isSucceeded) {
      return {
        isSucceeded: true,
        data: response.data,
      };
    }
    return {
      isSucceeded: false,
      data: {},
      message: response.message,
    };
  }
  async Create(product: ProductDto): Promise<ApiResult<boolean>> {
    const response = await axios.POST(URL.PRODUCT.CREATE, product);
    if (response.isSucceeded) {
      return {
        isSucceeded: true,
        data: true,
      };
    }
    return {
      isSucceeded: false,
      message: response.message,
      data: false,
    };
  }
  async Update(product: ProductDto): Promise<ApiResult<boolean>> {
    const response = await axios.PUT(URL.PRODUCT.UPDATE, product);
    if (response.isSucceeded) {
      return {
        data: true,
        isSucceeded: true,
      };
    }
    return {
      data: false,
      isSucceeded: false,
      message: response.message,
    };
  }
  async Delete(id: string): Promise<ApiResult<boolean>> {
    const response = await axios.DELETE(`${URL.PRODUCT.DELETE}/${id}`);
    if (response.isSucceeded) {
      return {
        data: true,
        isSucceeded: true,
      };
    }
    return {
      data: false,
      isSucceeded: false,
      message: response.message,
    };
  }
  async GetVariants(productId: string | undefined): Promise<ApiResult<ProductVariantDto[]>> {
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
