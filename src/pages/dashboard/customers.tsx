import { Helmet } from 'react-helmet-async';

import CustomersView from 'src/sections/customer-dashboard/view-customers';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Danh sách khách hàng</title>
      </Helmet>

      <CustomersView />
    </>
  );
}
