// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    product: `${ROOTS.DASHBOARD}/product`,
    three: `${ROOTS.DASHBOARD}/three`,
    customer: `${ROOTS.DASHBOARD}/customers`,
    setting: `${ROOTS.DASHBOARD}/setting`,
    POS: `${ROOTS.DASHBOARD}/pos-v1`,

    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
    groupProduct: {
      root: `${ROOTS.DASHBOARD}/product`,
      product: `${ROOTS.DASHBOARD}/product/products`,
      createProduct: `${ROOTS.DASHBOARD}/product/create-product`,
      category: `${ROOTS.DASHBOARD}/product/categories`,
    },
    groupOrder: {
      root: `${ROOTS.DASHBOARD}/order`,
      order: `${ROOTS.DASHBOARD}/order/orders`,
      category: `${ROOTS.DASHBOARD}/order/categories`,
    },
    groupCustomer: {
      root: `${ROOTS.DASHBOARD}/customer`,
      customer: `${ROOTS.DASHBOARD}/customer/customers`,
      category: `${ROOTS.DASHBOARD}/customer/categories`,
      createCustomer: `${ROOTS.DASHBOARD}/customer/create-customer`,
    },
  },
};
