const defaultPageSize = 10;
const defaultPageIndex = 1;

export class OptionFilterCustomer {
  pageSize: number;
  pageIndex: number;
  nameOrPhone?: string;

  constructor(pageSize: number = defaultPageSize, pageIndex: number = defaultPageIndex) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}
