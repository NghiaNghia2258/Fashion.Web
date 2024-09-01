import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));
const PageCreateProduct = lazy(() => import('src/pages/dashboard/createProduct'));
const DashboardPage = lazy(() => import('src/pages/dashboard/dashboard'));
const ProductsPage = lazy(() => import('src/pages/dashboard/products'));
const ProductDetailPage = lazy(() => import('src/pages/dashboard/productDetail'));
const CustomersPage = lazy(() => import('src/pages/dashboard/customers'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <DashboardPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      { path: 'customer', element: <PageThree /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <PageFour />, index: true },
          { path: 'products', element: <ProductsPage /> },
          { path: 'create-product', element: <PageCreateProduct /> },
          { path: 'categories', element: <PageSix /> },
          { path: 'product-detail/:id', element: <ProductDetailPage /> },
        ],
      },
      {
        path: 'customer',
        children: [
          { element: <PageFour />, index: true },
          { path: 'customers', element: <CustomersPage /> },
          { path: 'create-customer', element: <PageSix /> },
          { path: 'customer-group', element: <PageFive /> },
        ],
      },
    ],
  },
];
