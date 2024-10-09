import { OrderDto } from './order-dto';
import { ProductRateDto } from './product-rate';
import { RecipientsInformationDto } from './recipients-information-dto';
import { UserLoginDto } from './user-login-dto';

export interface CustomerDto {
  id?: string;
  code?: string;
  name?: string;
  phone?: string;
  gender?: string;
  point?: number;
  userLoginId?: string;
  quarterlySpending?: number; // new column
  debt?: number;
  isDeleted?: boolean;
  deletedAt?: Date;
  deletedBy?: string;
  deletedName?: string;
  createdAt?: Date;
  createdBy?: string;
  createdName?: string;
  productRates?: ProductRateDto[];
  recipientsInformations?: RecipientsInformationDto[];
  orders?: OrderDto[];

  userLogin?: UserLoginDto;
}
