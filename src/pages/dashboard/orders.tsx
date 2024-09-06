import { Helmet } from 'react-helmet-async';

import OrdersView from 'src/sections/order-dashboard/view-orders';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Danh sách hóa đơn</title>
      </Helmet>

      <OrdersView />
    </>
  );
}
