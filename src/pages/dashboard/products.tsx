import { Helmet } from 'react-helmet-async';

import ProductsView from 'src/sections/product-dashboard/view-products';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Danh sách sản phẩm</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
