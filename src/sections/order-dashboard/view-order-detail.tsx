import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'src/routes/hooks';
import { DashboardContext } from 'src/layouts/dashboard';
import AlertDialog from 'src/components/dialog/alert-dialog';
import { Button, TextField } from '@mui/material';

import BackspaceIcon from '@mui/icons-material/Backspace';

import SendIcon from '@mui/icons-material/Send';

import { OrderDto } from 'src/sevices/DTOs/order-dto';
import OrderService from 'src/sevices/api/order-services';

import { InputFile } from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

export default function OrderDetailView() {
  const settings = useSettingsContext();
  const toast = useContext(DashboardContext);
  const params = useParams();
  const router = useRouter();

  const [isOpenDialogCreate, setIsOpenDialogUpdate] = useState<boolean>(false);
  const [isOpenDialogCancel, setIsOpenDialogCancel] = useState<boolean>(false);
  const [orderById, setOrderById] = useState<OrderDto>({});

  useEffect(() => {
    const fetchOrderById = async () => {
      const orderService = new OrderService();
      const res = await orderService.GetById(params.id);
      setOrderById(res.data ?? {});
    };
    fetchOrderById();
  }, []);

  const handleDisagree = () => {
    setIsOpenDialogUpdate(false);
    setIsOpenDialogCancel(false);
  };
  const handleAgreeUpdate = async () => {
    setIsOpenDialogUpdate(false);
    const orderService = new OrderService();
    const res = await orderService.Update(orderById);
    if (res.isSucceeded) {
      toast?.ShowToast({
        severity: 'success',
        description: 'Cập nhật hóa đơn thành công!',
        autoHideDuration: 3000,
        title: 'Thành công',
      });
      router.replace('/dashboard/order/orders');
    } else {
      toast?.ShowToast({
        severity: 'error',
        description: res.message,
        autoHideDuration: 3000,
        title: 'Có lỗi xảy ra',
      });
    }
  };
  const handleAgreeCancel = () => {
    setIsOpenDialogCancel(false);
    router.replace('/dashboard/order/orders');
  };
  return (
    <Container
      sx={{
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        borderRadius: 1,
        padding: 2,
        mt: 4,
        mb: 4,
        mx: 'auto',
        maxWidth: '100%',
      }}
      maxWidth={settings.themeStretch ? false : 'xl'}
    >
      <Box>
        <Typography variant="h3"> Chi tiết hóa đơn {orderById.code} </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 1,
          padding: 2,
          marginTop: 2,
        }}
      >
        <Typography
          sx={{
            paddingBottom: 1,
            borderBottom: '1px solid #919eabcc',
          }}
        >
          Thông tin hóa đơn
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flex: 12 }}>
            <Box
              sx={{
                width: '31.5%',
              }}
            >
              <TextField
                label="Mã HD"
                type="text"
                variant="standard"
                value={orderById.code ?? ''}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: '31.5%',
              }}
            >
              <TextField
                label="Khách hàng"
                type="text"
                variant="standard"
                value={orderById.customerName ?? ''}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: '31.5%',
              }}
            >
              <TextField
                label="Số điện thoại"
                type="text"
                variant="standard"
                value={orderById.customerPhone ?? ''}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: '31.5%',
              }}
            >
              <TextField
                label="Mã giảm giá"
                type="text"
                variant="standard"
                value={orderById.voucherCode ?? ''}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: '31.5%',
              }}
            >
              <TextField
                label="Mã giảm giá"
                type="text"
                variant="standard"
                value={orderById.voucherCode ?? ''}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: '31.5%',
              }}
            >
              <TextField
                label="Mã giảm giá"
                type="text"
                variant="standard"
                value={orderById.voucherCode ?? ''}
                disabled
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', flex: 9 }}>
            <Box
              sx={{
                width: '48.5%',
              }}
            >
              <TextField
                label="Ghi chú của khách hàng"
                multiline
                rows={3}
                fullWidth
                disabled
                value={orderById.customerNote ?? ''}
              />
            </Box>
            <Box
              sx={{
                width: '48.5%',
              }}
            >
              <TextField
                label="Ghi chú hóa đơn"
                multiline
                rows={3}
                fullWidth
                disabled
                value={orderById.note ?? ''}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          marginTop: 4,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
            padding: 2,
            flex: 7,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              backgroundColor: 'ButtonShadow',
              padding: '0 10px',
              alignItems: 'center',
            }}
          >
            <Box flex={1}>STT</Box>
            <Box flex={2}>Ảnh</Box>
            <Box flex={5}>Sản phẩm</Box>
            <Box flex={2}>SL</Box>
            <Box flex={3}>Giá bán</Box>
            <Box flex={3}>Tổng tiền</Box>
            <Box flex={2}>Chiết khấu</Box>
          </Box>
          <Box>
            {(orderById.orderItems ?? []).map((orderItem, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  padding: '12px 10px',
                  alignItems: 'center',
                  borderBottom: '1px solid #919eabcc',
                }}
              >
                <Box flex={1}>{index + 1}</Box>
                <Box
                  flex={2}
                  sx={{
                    '& img': {
                      width: '75%',
                      height: '75%',
                      objectFit: 'contain',
                      borderRadius: 1,
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      overflow: 'hidden',
                    },
                  }}
                >
                  {<InputFile file={orderItem.imageUrl ?? ''} imageView />}
                </Box>
                <Box flex={5}>{orderItem.productVariantName}</Box>
                <Box flex={2}>{orderItem.quantity}</Box>
                <Box flex={3}>{orderItem.unitPrice}</Box>
                <Box flex={3}>
                  {((orderItem.quantity ?? 0) * (orderItem.unitPrice ?? 0)).toLocaleString()}
                </Box>
                <Box flex={2}>
                  {(
                    (orderItem.discountValue ?? 0) +
                    (orderItem.discountPercent ?? 0) *
                      (orderItem.unitPrice ?? 0) *
                      (orderItem.quantity ?? 0)
                  ).toLocaleString()}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
            padding: 2,
            flex: 4,
          }}
        >
          <Typography
            sx={{
              paddingBottom: 1,
              borderBottom: '1px solid #919eabcc',
            }}
          >
            Thông tin thanh toán
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <Typography sx={{ fontSize: '17px', fontWeight: 700 }}>Tổng tiền</Typography>
            <Typography>{orderById.totalPrice}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 1,
            }}
          >
            <Typography sx={{ fontSize: '17px', fontWeight: 700 }}>Giảm giá giá trị</Typography>
            <Typography>{orderById.discountValue}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 1,
            }}
          >
            <Typography sx={{ fontSize: '17px', fontWeight: 700 }}>Giảm giá %</Typography>
            <Typography>{(orderById.discountPercent ?? 0) * 100}%</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 1,
            }}
          >
            <Typography sx={{ fontSize: '17px', fontWeight: 700 }}>Khách đưa</Typography>
            <Typography>{orderById.totalPrice}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 1,
            }}
          >
            <Typography sx={{ fontSize: '17px', fontWeight: 700 }}>
              Phương thức thanh toán
            </Typography>
            <Typography>Tiền mặt</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 1,
          padding: 2,
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: 1,
        }}
      >
        <Button
          sx={{ height: '40px', width: '80px' }}
          onClick={() => {
            setIsOpenDialogCancel(true);
          }}
          variant="contained"
          color="error"
          startIcon={<BackspaceIcon />}
          size="small"
        >
          Hủy
        </Button>
        <Button
          sx={{ height: '40px' }}
          onClick={() => {
            setIsOpenDialogUpdate(true);
          }}
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          size="small"
        >
          Cập nhật
        </Button>
      </Box>

      <AlertDialog
        isOpen={isOpenDialogCancel}
        labelAgree="Xác nhận"
        labelDisagree="Hủy"
        handleAgree={handleAgreeCancel}
        handleDisagree={handleDisagree}
        description="Hủy thao tác ?"
        title="Xác nhận"
      />
      <AlertDialog
        isOpen={isOpenDialogCreate}
        labelAgree="Xác nhận"
        labelDisagree="Hủy"
        handleAgree={handleAgreeUpdate}
        handleDisagree={handleDisagree}
        description="Xác nhận sửa sản phẩm ?"
        title="Sửa sản phẩm"
      />
    </Container>
  );
}
