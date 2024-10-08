import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'Dashboard',
        items: [
          { title: 'Tổng Quan', path: paths.dashboard.root, icon: ICONS.dashboard },
          {
            title: 'Sản phẩm',
            path: paths.dashboard.product,
            icon: ICONS.product,
            children: [
              { title: 'Danh sách sản phẩm', path: paths.dashboard.groupProduct.product },
              { title: 'Thêm mới sản phẩm', path: paths.dashboard.groupProduct.createProduct },
              { title: 'Loại sản phẩm', path: paths.dashboard.groupProduct.category },
            ],
          },
          {
            title: 'Khách hàng',
            path: paths.dashboard.customer,
            icon: ICONS.user,
            children: [
              { title: 'Danh sách khách hàng', path: paths.dashboard.groupCustomer.customer },
              { title: 'Thêm mới khách hàng', path: paths.dashboard.groupCustomer.createCustomer },
              { title: 'Nhóm khách hàng', path: paths.dashboard.groupCustomer.category },
            ],
          },
          {
            title: 'Đơn hàng',
            path: paths.dashboard.groupOrder.root,
            icon: ICONS.menuItem,
            children: [{ title: 'Danh sách hóa đơn', path: paths.dashboard.groupOrder.order }],
          },
          {
            title: 'Bán hàng tại quầy',
            path: paths.dashboard.POS,
            icon: ICONS.analytics,
          },
          {
            title: 'Thống kê',
            path: paths.dashboard.group.root,
            icon: ICONS.analytics,
            children: [
              { title: 'four', path: paths.dashboard.group.root },
              { title: 'five', path: paths.dashboard.group.five },
              { title: 'six', path: paths.dashboard.group.six },
            ],
          },
          {
            title: 'Cài đặt',
            path: paths.dashboard.setting,
            icon: ICONS.analytics,
          },
        ],
      },
    ],
    []
  );

  return data;
}
