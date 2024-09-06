import { OrderDto } from '../DTOs/order-dto';
import { OptionFilterOrder } from '../paramas/option-filter-order';
import { ApiResult } from './api-result';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class OrderService {
  async GetAll(option: OptionFilterOrder): Promise<ApiResult<OrderDto[]>> {
    await delay(2000);
    const response = {
      isSucceeded: true,
      message: '',
      totalRecordsCount: 30,
      data: [
        {
          code: 'HD001',
          customerName: 'Nguyễn Văn A',
          createdAt: new Date('2024-09-06'),
          createdName: 'Trần B',
          totalPrice: 1000000,
          discountValue: 100000,
          discountPercent: 0.1,
          tax: 0.05,
          status: 1,
        },
        {
          code: 'HD002',
          customerName: 'Nguyễn Văn B',
          createdAt: new Date('2024-09-07'),
          createdName: 'Trần C',
          totalPrice: 1500000,
          discountValue: 150000,
          discountPercent: 0.15,
          tax: 0.07,
          status: 2,
        },
        {
          code: 'HD003',
          customerName: 'Nguyễn Văn C',
          createdAt: new Date('2024-09-08'),
          createdName: 'Trần D',
          totalPrice: 2000000,
          discountValue: 200000,
          discountPercent: 0.2,
          tax: 0.08,
          status: 3,
        },
        {
          code: 'HD004',
          customerName: 'Nguyễn Văn D',
          createdAt: new Date('2024-09-09'),
          createdName: 'Trần E',
          totalPrice: 2500000,
          discountValue: 250000,
          discountPercent: 0.25,
          tax: 0.09,
          status: 6,
        },
      ],
    };
    if (response.isSucceeded) {
      return {
        isSucceeded: true,
        data: response.data,
        totalRecordsCount: response.totalRecordsCount,
      };
    } else {
      return {
        isSucceeded: false,
        data: [],
        totalRecordsCount: 0,
        message: response.message,
      };
    }
  }
}
