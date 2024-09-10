import { OrderDto } from '../DTOs/order-dto';
import { VoucherDto } from '../DTOs/voucher-dto';
import { OptionFilterOrder } from '../paramas/option-filter-order';
import { ApiResult } from './api-result';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class OrderService {
  async GetAll(option: OptionFilterOrder): Promise<ApiResult<OrderDto[]>> {
    await delay(300);
    const response = {
      isSucceeded: true,
      message: '',
      totalRecordsCount: 30,
      data: [
        {
          id: '1',
          code: 'HD001',
          name: 'Chị Hà',
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
          id: '5',
          code: 'HD005',
          name: 'Chị My cạnh 6789',
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
          id: '2',
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
          id: '3',
          code: 'HD003',
          name: 'Ship lllllllllllllllllllllllllllllllllllllll',
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
          id: '4',
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
  async GetById(id: string | undefined): Promise<ApiResult<OrderDto>> {
    await delay(2000);
    const response = {
      isSucceeded: true,
      message: '',
      data: {
        id: '1',
        code: 'HD001',
        customerName: 'Nguyễn Văn A',
        createdAt: new Date('2024-09-06'),
        createdName: 'Trần Quang Nam',
        customerPhone: '0342534443',
        totalPrice: 1000000,
        discountValue: 100000,
        discountPercent: 0.1,
        note: 'Hóa đơn khách đã thanh toán trước',
        customerNote: 'Giao hàng trước ngày 9/7',
        tax: 0.05,
        status: 1,
        voucherCode: 'XBSA-ANMH-LGFD-AUNS',
        orderItems: [
          {
            id: '1',
            orderId: '1',
            productVariantId: '1',
            productVariantName: 'Áo mùa hè S-Đỏ',
            imageUrl:
              'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
            quantity: 2,
            unitPrice: 100,
            discountPercent: 0.1,
            discountValue: 10,
          },
          {
            id: '2',
            orderId: '1',
            productVariantId: '2',
            productVariantName: 'Áo mùa hè M-Đỏ',
            imageUrl:
              'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
            quantity: 1,
            unitPrice: 200,
            discountPercent: 0.1,
            discountValue: 20,
          },
          {
            id: '3',
            orderId: '1',
            productVariantId: '3',
            productVariantName: 'Áo mùa đông M-Đỏ',
            imageUrl:
              'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
            quantity: 3,
            unitPrice: 300,
            discountPercent: 0.1,
            discountValue: 30,
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
      message: response.message,
      data: {},
    };
  }
  async Create(order: OrderDto): Promise<ApiResult<string>> {
    await delay(2000);
    const response = {
      isSucceeded: true,
      message: 'Hello order {order } is successfully created and is available at {order location }',
      data: 'HD005',
    };
    if (response.isSucceeded) {
      return {
        isSucceeded: true,
        data: response.data,
      };
    }
    return {
      isSucceeded: false,
      message: response.message,
      data: '',
    };
  }
  async Update(order: OrderDto): Promise<ApiResult<boolean>> {
    await delay(2000);
    const response = {
      isSucceeded: true,
      message: '',
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
  async Payment(order: OrderDto): Promise<ApiResult<boolean>> {
    await delay(2000);
    const response = {
      isSucceeded: true,
      message: '',
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
  async GetVoucher(voucherCode: string): Promise<ApiResult<VoucherDto>> {
    const response = {
      isSucceeded: true,
      message: '',
      data: {
        id: '1',
        voucherCode: 'XBSA-ANMH-LGFD-AUNS',
        title: 'Voucher giảm giá 10%',
        discountPercent: 0.1,
        discountValue: 0,
        maxDiscountValue: 50000,
        minOrderValue: 300000,
        usageLimit: 2,
        description: 'Áp dụng cho đơn hàng đã thanh toán trước',
        startDate: new Date('2024-01-31'),
        expirationDate: new Date('2024-12-31'),
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
      message: response.message,
      data: {},
    };
  }
}
