import { Helmet } from 'react-helmet-async';

import CreateProductView from 'src/sections/product-dashboard/view-create-product';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Thêm sản phẩm</title>
      </Helmet>

      <CreateProductView />
    </>
  );
}
