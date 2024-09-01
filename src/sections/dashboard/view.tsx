import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { useState } from 'react';
import { LineChart } from '@mui/x-charts';
import imageQC from '../../assets/images/qc/OIP.jpg';
import imageQC2 from '../../assets/images/qc/OIP2.jpg';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  const uData = [4000, 3000];
  const xLabels = ['Page A', 'Page B'];

  const [DailyBusinessResults, setDailyBusinessResults] = useState<any>({
    DailyRevenue: 0,
    quantityCancelOrder: 0,
    quantityNewOrder: 0,
  });

  let stt = -34;

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'idd',
      headerName: 'STT',
      width: 70,
      valueGetter: () => {
        return stt++;
      },
    },
    {
      field: 'mainImageUrl',
      width: 100,
      headerName: 'Ảnh',
      editable: false,
      renderCell: (params) => {
        return (
          <img
            src={`https://th.bing.com/th/id/OIP.yWyGljqH30lzaGRF2seM5QHaDt?rs=1&pid=ImgDetMain`}
            alt={params.row.name}
            width="100%"
          />
        );
      },
    },
    {
      field: 'name',
      width: 200,
      headerName: 'Sản phẩm',
      editable: false,
    },
    {
      field: 'sellCount',
      headerName: 'Đã bán',
      type: 'number',
      editable: false,
    },
    {
      field: 'inventory',
      headerName: 'Tồn kho',
      description: 'This column has a value getter and is not sortable.',
    },
  ];

  const rows = [
    { id: 1, mainImageUrl: 'OIP.jpg', name: 'Jon', sellCount: 14, inventory: 1 },
    { id: 2, mainImageUrl: 'OIP.jpg', name: 'Cersei', sellCount: 31, inventory: 1 },
    { id: 3, mainImageUrl: 'OIP.jpg', name: 'Jaime', sellCount: 31, inventory: 1 },
    { id: 4, mainImageUrl: 'OIP.jpg', name: 'Arya', sellCount: 11, inventory: 1 },
    { id: 5, mainImageUrl: 'OIP.jpg', name: 'Daenerys', sellCount: null, inventory: 1 },
  ];

  const notifications = [
    {
      title: 'Đơn hàng mới',
      description: 'Thông báo 1 đã xảy ra',
      time: '2023-05-20 15:30',
      category: 1,
    },
    {
      title: 'Thông báo 2',
      description: 'Thông báo 2 đã xảy ra',
      time: '2023-05-20 15:35',
      category: 2,
    },
    {
      title: 'Thông báo 3',
      description: 'Thông báo 3 đã xảy ra',
      time: '2023-05-20 15:40',
      category: 3,
    },
    {
      title: 'Thông báo 4',
      description: 'Thông báo 4 đã xảy ra',
      time: '2023-05-20 15:45',
      category: 4,
    },
    {
      title: 'Thông báo 5',
      description: 'Thông báo 5 đã xảy ra',
      time: '2023-05-20 15:50',
      category: 5,
    },
  ];

  const renderIconNotification = (category: Number) => {
    let icon = '';
    switch (category) {
      case 1:
        icon = 'ic_order';
        break;
      case 2:
        icon = 'ic_chat';
        break;
      case 3:
        icon = 'ic_mail';
        break;
      case 4:
        icon = 'ic_calendar';
        break;

      default:
        icon = 'ic_notification';
        break;
    }
    return <SvgColor src={`/assets/icons/navbar/${icon}.svg`} sx={{ width: 32, height: 32 }} />;
  };

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{
        borderRadius: 2,
        padding: '20px 10px',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h3">Tổng quan </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          backgroundColor: '',
        }}
      >
        <Box
          sx={{
            flex: 8,
            paddingRight: '50px',
            borderRight: '1px solid #00000073',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 5,
            }}
          >
            <Box
              sx={{
                width: '30%',
                padding: '5px 20px',
                backgroundColor: `#71c0f045`,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: alpha('#919eabcc', 0.2),
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#919eabcc',
                }}
              >
                Doanh thu
              </Typography>
              <Typography variant="h4">{DailyBusinessResults.DailyRevenue}</Typography>
            </Box>
            <Box
              sx={{
                width: '30%',
                padding: '5px 20px',
                backgroundColor: `#19ff2885`,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#919eabcc',
                }}
              >
                Đơn hàng mới
              </Typography>
              <Typography variant="h4">{DailyBusinessResults.quantityNewOrder}</Typography>
            </Box>
            <Box
              sx={{
                width: '30%',
                padding: '5px 20px',
                backgroundColor: `#ffa712a3`,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: alpha('#919eabcc', 0.2),
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#919eabcc',
                }}
              >
                Đơn hàng bị hủy
              </Typography>
              <Typography variant="h4">{DailyBusinessResults.quantityCancelOrder}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: '40px',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#f0f0f0',
              '&:hover': {
                backgroundColor: '#919eabcc',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                '& > p': {
                  padding: '15px 10px',
                  borderBottom: '2px solid black',
                },
              }}
            >
              <Typography>Doanh thu bán hàng</Typography>
              <Typography>Thống kê đơn hàng</Typography>
            </Box>
            <Box>
              <LineChart
                height={300}
                series={[
                  {
                    data: uData,
                    area: true,
                    showMark: false,
                    color: '#50b3efad',
                  },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                sx={{
                  width: '100%',
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: '50px',
              padding: '15px 30px',
              borderRadius: '10px',
              backgroundColor: '#f0f0f0',
              '&:hover': {
                backgroundColor: '#919eabcc',
              },
            }}
          >
            <Typography
              variant="h5"
              style={{
                paddingTop: '10px',
                paddingBottom: '25px',
                borderBottom: '2px solid #00000073',
              }}
            >
              Sản phẩm bán chạy
            </Typography>

            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
        <Box
          sx={{
            flex: 4,
            paddingLeft: '50px',
          }}
        >
          <Box
            component="img"
            src={imageQC}
            sx={{ width: '100%', borderRadius: 1 }}
            alt="Quảng cáo"
          />

          <Box
            component="img"
            src={imageQC2}
            sx={{ width: '100%', borderRadius: 1, marginTop: 2 }}
            alt="Quảng cáo"
          />

          <Box
            sx={{
              marginTop: '50px',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid',
            }}
          >
            <Typography
              variant="h5"
              style={{
                paddingTop: '10px',
                paddingBottom: '15px',
                borderBottom: '2px solid #00000073',
              }}
            >
              Thông báo
            </Typography>
            {notifications.map((notification, index) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  borderBottom: '1px solid #00000073',
                  '&:hover': {
                    backgroundColor: alpha('#919eabcc', 0.2),
                  },
                }}
              >
                <Box>{renderIconNotification(notification.category)}</Box>
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}
                      >
                        {notification.title}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: '#919eabcc',
                        }}
                      >
                        {notification.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: '#3b3d40cc',
                      }}
                    >
                      {notification.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
