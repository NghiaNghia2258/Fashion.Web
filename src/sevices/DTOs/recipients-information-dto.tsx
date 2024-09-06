import { CustomerDto } from './customer-dto';

import { OrderDto } from './order-dto';

export interface RecipientsInformationDto {
  id?: string;
  customerId?: string;
  recipientsName?: string;
  recipientsPhone?: string;
  recipientsNote?: string;
  ward?: string;
  district?: string;
  city?: string;
  longitude?: string;
  latitude?: string;
  detail?: string;

  customer?: CustomerDto;
  orders?: OrderDto[];
}
