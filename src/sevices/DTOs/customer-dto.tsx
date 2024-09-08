import { OrderDto } from './order-dto';
import { ProductRateDto } from './product-rate';
import { RecipientsInformationDto } from './recipients-information-dto';
import { UserLoginDto } from './user-login-dto';

export interface CustomerDto {
  id?: string;
  code?: string; // new column
  name?: string;
  phone?: string;
  gender?: string;
  point?: number;
  userLoginId?: string;
  quarterlySpending?: number; // new column
  debt?: number; // new column
  isDeleted?: boolean;
  deletedAt?: Date;
  deletedBy?: string;
  deletedName?: string;
  createdAt?: Date; // new column
  createdBy?: string; // new column
  createdName?: string; // new column
  productRates?: ProductRateDto[];
  recipientsInformations?: RecipientsInformationDto[];
  orders?: OrderDto[];

  userLogin?: UserLoginDto;
}
