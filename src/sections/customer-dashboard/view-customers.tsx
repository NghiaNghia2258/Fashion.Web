import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from 'src/components/dialog/alert-dialog';
import { CustomerDto } from 'src/sevices/DTOs/customer-dto';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CustomerService from 'src/sevices/api/customer-service';
import { OptionFilterCustomer } from 'src/sevices/paramas/option-fliter-customer';

import CircularProgress from '@mui/material/CircularProgress';

import CreateCustomerView from './view-create-customer';

// ----------------------------------------------------------------------

export default function CustomersView() {
  const settings = useSettingsContext();
  const [optionFilter, setOptionFilter] = useState<OptionFilterCustomer>(
    new OptionFilterCustomer()
  );
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [customerEdit, setCustomerEdit] = useState<CustomerDto>({});

  const [isOpenDialogCreateCustomer, setIsOpenDialogCreateCustomer] = useState<boolean>(false);
  const handleDisagree = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
  };
  const [customers, setcustomers] = useState<CustomerDto[]>([]);
  const renderRank = (paramas: any) => {
    if (paramas.row.quarterlySpending >= 10000000) {
      return (
        <Box
          sx={{
            border: '2px solid',
            height: '80%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
          }}
        >
          Kim Cương
        </Box>
      );
    } else if (paramas.row.quarterlySpending >= 5000000) {
      return (
        <Box
          sx={{
            border: '2px solid',
            height: '80%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
          }}
        >
          Bạch kim
        </Box>
      );
    } else if (paramas.row.quarterlySpending >= 2000000) {
      return (
        <Box
          sx={{
            border: '2px solid',
            height: '80%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
          }}
        >
          Vàng
        </Box>
      );
    } else if (paramas.row.quarterlySpending >= 1000000) {
      return (
        <Box
          sx={{
            border: '2px solid',
            height: '80%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
          }}
        >
          Bạc
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            border: '2px solid',
            height: '80%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
          }}
        >
          Đồng
        </Box>
      );
    }
  };
  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'Mã KH',
      width: 70,
    },
    {
      field: 'name',
      headerName: 'Tên khách hàng',
      width: 140,
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 130,
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      width: 90,
    },
    {
      field: 'point',
      headerName: 'Tích điểm',
      width: 90,
    },

    {
      field: 'quarterlySpending',
      headerName: 'Chi tiêu/90 ngày',
      width: 140,
      valueGetter: (value: number) => {
        return `${
          value ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''
        }`;
      },
    },
    {
      field: 'debt',
      headerName: 'Công nợ',
      width: 110,
      valueGetter: (value: number) => {
        return `${
          value ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''
        }`;
      },
    },
    {
      field: 'createdName',
      headerName: 'Người tạo',
      width: 145,
    },
    {
      field: 'createdNamea',
      headerName: 'Hạng',
      width: 100,
      renderCell: (row) => renderRank(row),
    },
    {
      field: 'ida',
      headerName: 'Thao tác',
      width: 90,
      renderCell: (gridRenderCellParams: GridRenderCellParams) => (
        <Box>
          <EditIcon
            onClick={() => {
              setCustomerEdit(gridRenderCellParams.row);
              setIsOpenDialogCreateCustomer(true);
            }}
          />
          <DeleteIcon
            onClick={() => {
              setOpen(true);
            }}
          />
        </Box>
      ),
    },
  ];
  const handleFilter = async (): Promise<void> => {
    setLoading(true);
    const customerService = new CustomerService();
    const res = await customerService.GetAll(optionFilter);
    setcustomers(res.data);
    setLoading(false);
  };
  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Danh sách khách hàng</Typography>

        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpenDialogCreateCustomer(true)}
          >
            Thêm khách hàng
            <ChevronRightIcon fontSize="small" />
          </Button>
        </Box>
      </Box>

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
          id="outlined-basic"
          label="Nhập tên/SDT khách hàng"
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            width: '300px',
            height: '38px',
            borderRadius: 1,
          }}
          size="small"
          onChange={(event) => {
            setOptionFilter({
              ...optionFilter,
              nameOrPhone: event.target.value,
            });
          }}
        />

        <Button
          onClick={() => {
            handleFilter();
          }}
          variant="contained"
          color="success"
          sx={{ height: '38px' }}
        >
          Lọc
        </Button>
      </Box>

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
        {loading ? (
          <CircularProgress sx={{ margin: '0 45%' }} />
        ) : (
          <DataGrid
            sx={{
              backgroundColor: '#fff',
              '& .MuiDataGrid-cell': {
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
              },
            }}
            rows={customers}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
                rowCount: 100,
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            disableRowSelectionOnClick
          />
        )}
      </Box>
      <AlertDialog
        isOpen={open}
        labelAgree="Xác nhận"
        labelDisagree="Hủy"
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        description="abc"
        title="Xác nhận xóa"
      />

      {isOpenDialogCreateCustomer ? (
        <CreateCustomerView
          handleAgree={() => {
            setIsOpenDialogCreateCustomer(false);
            setCustomerEdit({});
          }}
          handleDisAgree={() => {
            setIsOpenDialogCreateCustomer(false);
            setCustomerEdit({});
          }}
          customerEdit={customerEdit}
        />
      ) : null}
    </Container>
  );
}
