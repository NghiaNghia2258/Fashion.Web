import { Helmet } from 'react-helmet-async';

import OrderDetailView from 'src/sections/order-dashboard/view-order-detail';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Chi tiết hóa đơn</title>
      </Helmet>

      <OrderDetailView />
    </>
  );
}
