import { Helmet } from 'react-helmet-async';

import ProductDetailView from 'src/sections/product-dashboard/view-product-detail';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>

      <ProductDetailView />
    </>
  );
}
