import { ProductDto } from '../DTOs/product-dto';
import { OptionFilterProduct } from '../paramas/option-filter-product';
import { ApiResult } from './api-result';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class ProductService {
  async GetAll(options: OptionFilterProduct): Promise<ApiResult<ProductDto[]>> {
    // const response = await axios.post('/products', { params: options });
    await delay(300);
    const response = {
      isSucceeded: true,
      message: '',
      totalRecordsCount: 30,
      data: [
        {
          id: '1',
          name: 'T-Shirt',
          nameEn: 'T-Shirt',
          description: 'A comfortable cotton t-shirt.',
          mainImageUrl: 'https://example.com/images/tshirt.jpg',
          categoryId: '10',
          categoryName: 'Apparel',
          productVariants: [
            {
              id: '101',
              size: 'M',
              color: 'Red',
              price: 199999,
              imageUrl: 'https://example.com/images/tshirt-red-m.jpg',
              inventory: 20,
            },
            {
              id: '102',
              size: 'L',
              color: 'Blue',
              price: 229999,
              imageUrl: 'https://example.com/images/tshirt-blue-l.jpg',
              inventory: 30,
            },
          ],
        },
        {
          id: '2',
          name: 'Jeans',
          nameEn: 'Jeans',
          description: 'Stylish blue jeans.',
          mainImageUrl: 'https://example.com/images/jeans.jpg',
          categoryId: '10',
          categoryName: 'Apparel',
          productVariants: [
            {
              id: '201',
              size: '32',
              color: 'Dark Blue',
              price: 499999,
              imageUrl: 'https://example.com/images/jeans-darkblue-32.jpg',
              inventory: 40,
            },
          ],
        },
        {
          id: '3',
          name: 'Shoes',
          nameEn: 'Shoes',
          description: 'Comfortable sneakers.',
          mainImageUrl: 'https://example.com/images/shoes.jpg',
          categoryId: '11',
          categoryName: 'Footwear',
          productVariants: [
            {
              id: '301',
              size: '10',
              color: 'Black',
              price: 399999,
              imageUrl: 'https://example.com/images/shoes-black-10.jpg',
              inventory: 0,
            },
          ],
        },
        {
          id: '4',
          name: 'Accessories',
          nameEn: 'Accessories',
          description: 'Handmade accessories.',
          mainImageUrl: 'https://example.com/images/accessories.jpg',
          categoryId: '12',
          categoryName: 'Accessories',
          productVariants: [],
        },
        {
          id: '5',
          name: 'Electronics',
          nameEn: 'Electronics',
          description: 'High-quality electronics.',
          mainImageUrl: 'https://example.com/images/electronics.jpg',
          categoryId: '13',
          categoryName: 'Electronics',
          productVariants: [
            {
              id: '501',
              size: '10',
              color: 'Black',
              price: 299999,
              imageUrl:
                'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
              inventory: 50,
            },
          ],
        },
      ],
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
      };
    }
    return {
      isSucceeded: false,
      message: response.message,
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
        isSucceeded: true,
      };
    }
    return {
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
        isSucceeded: true,
      };
    }
    return {
      isSucceeded: false,
      message: response.message,
    };
  }
}
