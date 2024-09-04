const defaultPageSize = 10;
const defaultPageIndex = 1;

export class OptionFilterProduct {
  pageSize: number;
  pageIndex: number;
  name?: string | null;
  status?: number | null;
  priceMin?: number | null;
  priceMax?: number | null;
  categoryId?: string | null;

  constructor(pageSize: number = defaultPageSize, pageIndex: number = defaultPageIndex) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}
