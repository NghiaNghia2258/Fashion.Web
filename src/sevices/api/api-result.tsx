const defaultPageSize = 10;
const defaultPageIndex = 1;

export class ApiResult<T> {
  data?: T;
  totalRecordsCount?: number;
  message?: string;
  isSucceeded: boolean = true;
}
