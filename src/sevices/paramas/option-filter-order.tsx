const defaultPageSize = 10;
const defaultPageIndex = 1;

export class OptionFilterOrder {
  pageSize: number;
  pageIndex: number;
  customerId?: string;
  employeeId?: string;

  constructor(pageSize: number = defaultPageSize, pageIndex: number = defaultPageIndex) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}
