import { Helmet } from 'react-helmet-async';

import POSv1View from 'src/sections/POS/view-v1';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Bán hàng tại quầy</title>
      </Helmet>

      <POSv1View />
    </>
  );
}
