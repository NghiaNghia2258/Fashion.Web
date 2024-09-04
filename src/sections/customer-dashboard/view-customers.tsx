import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from 'src/components/dialog/alert-dialog';

// ----------------------------------------------------------------------

export default function CustomersView() {
  const settings = useSettingsContext();
  const [optionFilter, setoptionFilter] = useState({});
  const [open, setOpen] = useState(false);

  const handleDisagree = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
  };
  const [customers, setcustomers] = useState([
    {
      id: 1,
      name: 'Customer1',
      phone: '123',
      gender: 'Nam',
      point: 100,
      createdName: 'NN',
    },
    {
      id: 2,
      name: 'Customer2',
      phone: '456',
      gender: 'Nữ',
      point: 200,
      createdName: 'NV',
    },
    {
      id: 3,
      name: 'Customer3',
      phone: '789',
      gender: 'Nam',
      point: 300,
      createdName: 'NN',
    },
  ]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên khách hàng',
      width: 250,
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
      field: 'createdName',
      headerName: 'Người giới thiệu/Người tạo',
      width: 250,
    },
    {
      field: 'ida',
      headerName: 'Thao tác',
      width: 200,
      renderCell: () => {
        return (
          <Box>
            <EditIcon />
            <DeleteIcon
              onClick={() => {
                setOpen(true);
              }}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4">Danh sách khách hàng </Typography>

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
          label="Nhập tên khách hàng"
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            width: '300px',
          }}
          onChange={(event) => {
            // setOptionPagination({
            //   ...optionPagination,
            //   name: event.target.value,
            // });
          }}
        />

        <TextField
          id="outlined-basic"
          label="Số điện thoại"
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            width: '200px',
          }}
          onChange={(event) => {
            // setOptionPagination({
            //   ...optionPagination,
            //   name: event.target.value,
            // });
          }}
        />

        <Button
          onClick={() => {
            //console.log(optionPagination);
          }}
          variant="contained"
          color="success"
          sx={{}}
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
        <DataGrid
          rows={customers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
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
    </Container>
  );
}
