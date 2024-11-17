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
    await delay(2000);
    const response = {
      isSucceeded: true,
      message: '',
      data: {
        id: '1',
        name: 'T-Shirt',
        nameEn: 'T-Shirt',
        description: 'A comfortable cotton t-shirt.',
        mainImageUrl:
          'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
        categoryId: '2',
        categoryName: 'Apparel',
        productVariants: [
          {
            id: '101',
            size: 'M',
            color: 'Red',
            price: 199999,
            imageUrl:
              'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
            inventory: 50,
          },
          {
            id: '102',
            size: 'L',
            color: 'Blue',
            price: 229999,
            imageUrl: undefined,
            inventory: 30,
          },
        ],
        productImages: [
          {
            id: '103',
            imageUrl:
              'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
          },
          {
            id: '104',
            imageUrl:
              'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
          },
        ],
      },
    };
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
    console.log(product);
    await delay(2000);
    const response = {
      isSucceeded: false,
      message: 'Tên không được dài quá 6 ký tự',
    };
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
    console.log(product);
    await delay(2000);
    const response = {
      isSucceeded: true,
      message: 'Sản phẩm không tồn tại',
    };
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
    await delay(500);
    const response = {
      isSucceeded: true,
      message: 'Sản phẩm không tồn tại',
    };
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
