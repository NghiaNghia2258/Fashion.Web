import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { useEffect, useState } from 'react';
import { Button, TablePagination, TextField } from '@mui/material';

import { OrderDto } from 'src/sevices/DTOs/order-dto';
import OrderService from 'src/sevices/api/order-services';
import { OptionFilterOrder } from 'src/sevices/paramas/option-filter-order';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

export default function OrdersView() {
  const settings = useSettingsContext();
  const [optionFilter, setoptionFilter] = useState<OptionFilterOrder>(new OptionFilterOrder());
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecordsCount, setTotalRecordsCount] = useState<number>(0);
  const [orders, setOrders] = useState<OrderDto[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const orderService = new OrderService();
      const res = await orderService.GetAll(optionFilter);
      setOrders(res.data ?? []);
      setTotalRecordsCount(res.totalRecordsCount ?? 0);
      setLoading(false);
    };
    fetchOrder();
  }, []);

  const renderStatus = (status: number | undefined) => {
    switch (status) {
      case 1:
        return (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '15px',
              borderRadius: 1,
              width: '75%',
              padding: '3px 0',
              border: '3px solid #10e5eb',
              color: '#10e5eb',
            }}
          >
            Mới tạo
          </Box>
        );
      case 2:
        return (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '15px',
              borderRadius: 1,
              width: '75%',
              padding: '3px 0',
              border: '3px solid #95f900',
              color: '#95f900',
            }}
          >
            Đã xác nhận
          </Box>
        );
      case 3:
        return (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '15px',
              borderRadius: 1,
              width: '75%',
              padding: '3px 0',
              border: '3px solid #ebea10',
              color: '#ebea10',
            }}
          >
            Đang giao
          </Box>
        );
      case 4:
        return (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '15px',
              borderRadius: 1,
              width: '75%',
              padding: '3px 0',
              border: '3px solid #10e5eb',
              color: '#10e5eb',
            }}
          >
            Đã giao
          </Box>
        );
      case 5:
        return (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '15px',
              borderRadius: 1,
              width: '75%',
              padding: '3px 0',
              border: '3px solid #10e5eb',
              color: '#10e5eb',
            }}
          >
            Đã thanh toán
          </Box>
        );
      case 6: {
        return (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '15px',
              borderRadius: 1,
              width: '75%',
              padding: '3px 0',
              border: '3px solid #eb3810',
              color: '#eb3810',
            }}
          >
            Đã hủy
          </Box>
        );
      }
      default:
        return 'Chưa xác đ��nh';
    }
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h3">Danh sách hóa đơn </Typography>

      <Box
        sx={{
          mt: 5,
          padding: '10px 20px',
          display: 'flex',
          gap: 2,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.15),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <TextField
          label="Nhập tên khách hàng"
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            width: '250px',
          }}
          onChange={(event) => {
            // setoptionFilter({
            //   ...optionFilter,
            //   name: event.target.value,
            // });
          }}
        />
        <TextField
          label="Nhập tên người tạo"
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            width: '250px',
          }}
          onChange={(event) => {
            // setOptionPagination({
            //   ...optionPagination,
            //   name: event.target.value,
            // });
          }}
        />

        <TextField
          variant="outlined"
          type="date"
          sx={{
            backgroundColor: '#fff',
            width: '130px',
          }}
          onChange={(event) => {
            // setOptionPagination({
            //   ...optionPagination,
            //   name: event.target.value,
            // });
          }}
        />
        <TextField
          variant="outlined"
          type="date"
          sx={{
            backgroundColor: '#fff',
            width: '130px',
          }}
          onChange={(event) => {
            // setOptionPagination({
            //   ...optionPagination,
            //   name: event.target.value,
            // });
          }}
        />

        <Button
          onClick={async () => {
            setLoading(true);
            const orderService = new OrderService();
            const res = await orderService.GetAll(optionFilter);
            setOrders(res.data ?? []);
            setTotalRecordsCount(res.totalRecordsCount ?? 0);
            setLoading(false);
          }}
          variant="contained"
          color="success"
          sx={{ width: '80px' }}
        >
          Lọc
        </Button>
      </Box>

      <Box
        sx={{
          mt: 5,
          padding: '10px 20px',
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.15),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
          }}
          className="head"
        >
          <Box flex={2}>STT</Box>
          <Box flex={3}>Mã HD</Box>
          <Box flex={7}>Khách hàng</Box>
          <Box flex={5}>Ngày tạo</Box>
          <Box flex={6}>Người tạo</Box>
          <Box flex={5}>Tổng tiền</Box>
          <Box flex={3}>Thuế</Box>
          <Box flex={5}>Chiết khấu</Box>
          <Box flex={5}>Trạng thái</Box>
        </Box>
        <Box sx={{ backgroundColor: '#fff' }} className="list-order">
          {loading ? (
            <CircularProgress sx={{ margin: '10% 45%' }} />
          ) : (
            orders.map((order, index) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px 10px',
                    borderBottom: '1px solid #919eabcc',
                  }}
                >
                  <Box paddingLeft={'5px'} flex={2}>
                    {index + 1}
                  </Box>
                  <Box flex={3}>{order.code}</Box>
                  <Box flex={7}>{order.customerName}</Box>
                  <Box flex={5}>{order.createdAt?.toLocaleDateString()}</Box>
                  <Box flex={6}>{order.createdName}</Box>
                  <Box flex={5}>
                    {(order.totalPrice ?? 0).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Box>
                  <Box flex={3}>{((order.tax ?? 0) * 100).toFixed(2)}%</Box>
                  <Box flex={5}>
                    {(
                      (order.discountValue ?? 0) +
                      (order.discountPercent ?? 0) * (order.totalPrice ?? 0)
                    ).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Box>
                  <Box flex={5}>{renderStatus(order.status)}</Box>
                </Box>
              );
            })
          )}
        </Box>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          rowsPerPage={optionFilter.pageSize}
          page={optionFilter.pageIndex - 1}
          onPageChange={async (e, newPage) => {
            setoptionFilter({
              ...optionFilter,
              pageIndex: newPage + 1,
            });
            setLoading(true);
            const orderService = new OrderService();
            const res = await orderService.GetAll({
              ...optionFilter,
              pageIndex: newPage + 1,
            });
            setOrders(res.data ?? []);
            setTotalRecordsCount(res.totalRecordsCount ?? 0);
            setLoading(false);
          }}
          onRowsPerPageChange={async (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setoptionFilter({
              ...optionFilter,
              pageSize: parseInt(event.target.value, 10),
              pageIndex: 1,
            });
            setLoading(true);
            const orderService = new OrderService();
            const res = await orderService.GetAll({
              ...optionFilter,
              pageSize: parseInt(event.target.value, 10),
              pageIndex: 1,
            });
            setOrders(res.data ?? []);
            setTotalRecordsCount(res.totalRecordsCount ?? 0);
            setLoading(false);
          }}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
          labelRowsPerPage="Số bản ghi/trang"
          count={totalRecordsCount}
        />
      </Box>
    </Container>
  );
}
