export interface ApiResult<T> {
  data: T;
  totalRecordsCount?: number;
  message?: string;
  isSucceeded: boolean;
}
