import { OrderItemDto } from '../DTOs/order-item-dto';
import { ApiResult } from './api-result';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class OrderItemService {
  async GetByOrderId(orderId: string): Promise<ApiResult<OrderItemDto[]>> {
    await delay(1000);
    // Implement logic to fetch order items from API or database
    return {
      isSucceeded: true,
      data: [
        {
          orderId: '1',
          productVariantId: '1',
          imageUrl:
            'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg',
          quantity: 2,
          unitPrice: 100,
          discountPercent: 0.1,
          discountValue: 10,
        },
      ],
      message: '',
    };
  }
}
