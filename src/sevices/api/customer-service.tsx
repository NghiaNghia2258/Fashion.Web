import { CustomerDto } from '../DTOs/customer-dto';
import { OptionFilterCustomer } from '../paramas/option-fliter-customer';
import { ApiResult } from './api-result';
import { URL } from '../constURL/constURL';

import * as axios from '../axios-instance/axios-host1';

export default class CustomerService {
  async GetAll(option: OptionFilterCustomer): Promise<ApiResult<CustomerDto[]>> {
    const response = await axios.GET(URL.CUSTOMER.GETALL, {
      params: option,
    });
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
    const response = await axios.GET(`${URL.CUSTOMER.GETONE}/${id}`);
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
    const response = await axios.POST(URL.CUSTOMER.CREATE, customer);
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
    const response = await axios.PUT(URL.CUSTOMER.UPDATE, customer);

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
    const response = await axios.DELETE(`${URL.CUSTOMER.DELETE}/${id}`);

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
