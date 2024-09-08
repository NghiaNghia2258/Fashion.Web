import { CustomerDto } from '../DTOs/customer-dto';
import { OptionFilterCustomer } from '../paramas/option-fliter-customer';
import { ApiResult } from './api-result';

export default class CustomerService {
  async GetAll(option: OptionFilterCustomer): Promise<ApiResult<CustomerDto[]>> {
    // TODO: Implement logic to fetch all customers from API or database
    const response = {
      isSucceeded: true,
      message: '',
      data: [
        {
          id: '1',
          code: 'KH001',
          name: 'Customer1',
          phone: '0342534443',
          gender: 'Nam',
          point: 100,
          debt: 100000,
          quarterlySpending: 1242000,
          createdName: 'Ngô Quang Nghĩa',
        },
        {
          id: '2',
          code: 'KH002',
          name: 'Customer2',
          phone: '0342534443',
          gender: 'Nữ',
          debt: 100000,
          quarterlySpending: 1242000,
          point: 200,
          createdName: 'Ngô Quang Nghĩa',
        },
        {
          id: '3',
          code: 'KH003',
          name: 'Customer3',
          phone: '0342534443',
          gender: 'Nam',
          debt: 100000,
          quarterlySpending: 12420000,
          point: 300,
          createdName: 'Ngô Quang Nghĩa',
        },
      ],
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
      data: [],
    };
  }
  async GetById(id: string): Promise<ApiResult<CustomerDto>> {
    // TODO: Implement logic to fetch customer by ID from API or database
    const response = {
      isSucceeded: true,
      message: '',
      data: {
        id: '1',
        code: 'KH001',
        name: 'Customer1',
        phone: '0342534443',
        gender: 'male',
        point: 100,
        debt: 100000,
        quarterlySpending: 1242000,
        createdName: 'Ngô Quang Ngh��a',
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
  async Create(customer: CustomerDto): Promise<ApiResult<boolean>> {
    // TODO: Implement logic to create a new customer in API or database
    const response = {
      isSucceeded: false,
      message: 'Có lỗi xảy ra',
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
  async Update(customer: CustomerDto): Promise<ApiResult<boolean>> {
    // TODO: Implement logic to update a customer in API or database
    console.log(customer);
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
  async Delete(id: string): Promise<ApiResult<boolean>> {
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
}
