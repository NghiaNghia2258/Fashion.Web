export class ApiResult<T> {
  data?: T;
  totalRecordsCount?: number;
  message?: string;
  isSucceeded: boolean = true;
}
