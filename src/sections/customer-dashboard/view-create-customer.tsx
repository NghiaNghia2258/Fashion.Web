import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

import BackspaceIcon from '@mui/icons-material/Backspace';

import { useSettingsContext } from 'src/components/settings';
import { Button, TextField } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useContext, useEffect, useState } from 'react';
import { CustomerDto } from 'src/sevices/DTOs/customer-dto';
import { DashboardContext } from 'src/layouts/dashboard';
import CustomerService from 'src/sevices/api/customer-service';

// ----------------------------------------------------------------------
type CreateCustomerProps = {
  handleAgree: VoidFunction;
  handleDisAgree: VoidFunction;
  customerEdit?: CustomerDto;
};

export default function CreateCustomerView({
  handleAgree,
  handleDisAgree,
  customerEdit,
}: CreateCustomerProps) {
  const settings = useSettingsContext();
  const toast = useContext(DashboardContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [customerEdited, setCustomerEdited] = useState<CustomerDto>({});
  const [newCustomer, setNewCustomer] = useState<CustomerDto>({
    name: '',
    phone: '',
    gender: '',
  });

  const [isErrInputName, setisErrInputName] = useState<boolean>(false);
  const [isErrInputPhone, setisErrInputPhone] = useState<boolean>(false);

  useEffect(() => {
    if (customerEdit?.id) {
      const customerService = new CustomerService();
      customerService.GetById(customerEdit?.id).then((res) => {
        setCustomerEdited(res.data);
      });
    }
  }, []);
  if (customerEdit?.id) {
    return (
      <Container
        maxWidth={settings.themeStretch ? false : 'xl'}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '20px',
            width: '25%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              paddingBottom: '10px',
              borderBottom: '1px solid #919eabcc',
            }}
          >
            Thông tin khách hàng
          </Typography>
          <Box padding={'10px 0'}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                Tên khách hàng <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                error={isErrInputName}
                helperText={isErrInputName ? 'Tên > 6 ký tự và khác rỗng' : ''}
                sx={{ width: '60%' }}
                placeholder="Nhập tên khách hàng"
                type="text"
                variant="standard"
                size="small"
                value={customerEdited.name ?? ''}
                onChange={(event: any) => {
                  setCustomerEdited({
                    ...customerEdited,
                    name: event.target.value,
                  });
                  if (event.target.value.length <= 6) {
                    setisErrInputName(true);
                    return;
                  }
                  setisErrInputName(false);
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                Số điện thoại <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                error={isErrInputPhone}
                helperText={isErrInputPhone ? 'Số điện thoại không hợp lệ' : ''}
                placeholder="Nhập số điện thoại"
                type="text"
                sx={{ width: '60%' }}
                value={customerEdited.phone ?? ''}
                variant="standard"
                size="small"
                onChange={(event: any) => {
                  setCustomerEdited({
                    ...customerEdited,
                    phone: event.target.value,
                  });
                  if (event.target.value.length !== 10) {
                    setisErrInputPhone(true);
                    return;
                  }
                  setisErrInputPhone(false);
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={customerEdited.gender ?? ''}
                onChange={(event: any) => {
                  setCustomerEdited({
                    ...customerEdited,
                    gender: event.target.value,
                  });
                }}
              >
                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                <FormControlLabel value="other" control={<Radio />} label="Khác" />
              </RadioGroup>
            </Box>
          </Box>

          <Box
            sx={{
              borderTop: '1px solid #919eabcc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              gap: 1,
              paddingTop: '15px',
              backgroundColor: '#fff',
              marginTop: '10px',
            }}
          >
            <Button
              sx={{ height: '40px', width: '80px' }}
              onClick={() => {
                handleDisAgree();
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
              onClick={async () => {
                if (isErrInputName || (customerEdited.name ?? '').length <= 6) {
                  setisErrInputName(true);
                  toast?.ShowToast({
                    severity: 'error',
                    description: 'Tên không hợp lệ',
                    autoHideDuration: 3000,
                    title: 'Thất bại',
                  });
                  return;
                } else if (isErrInputPhone || (customerEdited.phone ?? '').length !== 10) {
                  setisErrInputPhone(true);
                  toast?.ShowToast({
                    severity: 'error',
                    description: 'Số điện thoại không hợp lệ',
                    autoHideDuration: 3000,
                    title: 'Thất bại',
                  });
                  return;
                }

                setLoading(true);
                const customerService = new CustomerService();
                const res = await customerService.Update(customerEdited);
                if (res.isSucceeded) {
                  toast?.ShowToast({
                    severity: 'success',
                    description: 'Sửa khách hàng thành công!',
                    autoHideDuration: 3000,
                    title: 'Thành công',
                  });
                } else {
                  toast?.ShowToast({
                    severity: 'error',
                    description: res.message,
                    autoHideDuration: 3000,
                    title: 'Thất bại',
                  });
                }
                setLoading(false);
                handleAgree();
              }}
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              size="small"
            >
              Cập nhật
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '20px',
          width: '25%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            paddingBottom: '10px',
            borderBottom: '1px solid #919eabcc',
          }}
        >
          Thông tin khách hàng
        </Typography>
        <Box padding={'10px 0'}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
              Tên khách hàng <span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              error={isErrInputName}
              helperText={isErrInputName ? 'Tên > 6 ký tự và khác rỗng' : ''}
              sx={{ width: '60%' }}
              placeholder="Nhập tên khách hàng"
              type="text"
              variant="standard"
              size="small"
              onChange={(event: any) => {
                if (event.target.value.length <= 6) {
                  setisErrInputName(true);
                  return;
                }
                setisErrInputName(false);
                setNewCustomer({
                  ...newCustomer,
                  name: event.target.value,
                });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
              Số điện thoại <span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              error={isErrInputPhone}
              helperText={isErrInputPhone ? 'Số điện thoại không hợp lệ' : ''}
              placeholder="Nhập số điện thoại"
              type="text"
              sx={{ width: '60%' }}
              variant="standard"
              size="small"
              onChange={(event: any) => {
                if (event.target.value.length !== 10) {
                  setisErrInputPhone(true);
                  return;
                }
                setisErrInputPhone(false);
                setNewCustomer({
                  ...newCustomer,
                  phone: event.target.value,
                });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              onChange={(event: any) => {
                setNewCustomer({
                  ...newCustomer,
                  gender: event.target.value,
                });
              }}
            >
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              <FormControlLabel value="other" control={<Radio />} label="Khác" />
            </RadioGroup>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid #919eabcc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: 1,
            paddingTop: '15px',
            backgroundColor: '#fff',
            marginTop: '10px',
          }}
        >
          <Button
            sx={{ height: '40px', width: '80px' }}
            onClick={() => {
              handleDisAgree();
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
            onClick={async () => {
              console.log(newCustomer);
              if (isErrInputName || (newCustomer.name ?? '').length <= 6) {
                setisErrInputName(true);
                toast?.ShowToast({
                  severity: 'error',
                  description: 'Tên không hợp lệ',
                  autoHideDuration: 3000,
                  title: 'Thất bại',
                });
                return;
              } else if (isErrInputPhone || (newCustomer.phone ?? '').length !== 10) {
                setisErrInputPhone(true);
                toast?.ShowToast({
                  severity: 'error',
                  description: 'Số điện thoại không hợp lệ',
                  autoHideDuration: 3000,
                  title: 'Thất bại',
                });
                return;
              }

              setLoading(true);
              const customerService = new CustomerService();
              const res = await customerService.Create(newCustomer);
              if (res.isSucceeded) {
                toast?.ShowToast({
                  severity: 'success',
                  description: 'Tạo sản phẩm thành công!',
                  autoHideDuration: 3000,
                  title: 'Thành công',
                });
              } else {
                toast?.ShowToast({
                  severity: 'error',
                  description: res.message,
                  autoHideDuration: 3000,
                  title: 'Thất bại',
                });
              }
              setLoading(false);
              handleAgree();
            }}
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            size="small"
          >
            Thêm mới
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
