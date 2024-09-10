import { OrderItemDto } from '../DTOs/order-item-dto';
import { ApiResult } from './api-result';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class OrderItemService {
  async GetByOrderId(orderId: string | undefined): Promise<ApiResult<OrderItemDto[]>> {
    await delay(1000);
    // Implement logic to fetch order items from API or database
    return {
      isSucceeded: true,
      data: [
        {
          id: '1',
          orderId: '1',
          productVariantId: '1',
          productVariantName: 'Áo khoác gió thể thao XXL - Đen',
          imageUrl:
            'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
          quantity: 2,
          unitPrice: 1999999,
          discountPercent: 0.1,
          discountValue: 10,
        },
        {
          id: '2',
          orderId: '1',
          productVariantId: '2',
          productVariantName: 'Áo khoác gió thể thao XXL - Đen',
          imageUrl:
            'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
          quantity: 1,
          unitPrice: 200000,
          discountPercent: 0.2,
          discountValue: 0,
        },
        {
          id: '3',
          orderId: '1',
          productVariantId: '3',
          productVariantName: 'Áo khoác gió thể thao XXL - Đen',
          imageUrl:
            'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
          quantity: 3,
          unitPrice: 300999,
          discountPercent: 0.1,
          discountValue: 30,
        },
        {
          id: '4',
          orderId: '2',
          productVariantId: '4',
          productVariantName: 'Áo thể thao XXL - Đen',
          imageUrl:
            'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
          quantity: 1,
          unitPrice: 400999,
          discountPercent: 0.1,
          discountValue: 40,
        },
      ],
      message: '',
    };
  }
}
