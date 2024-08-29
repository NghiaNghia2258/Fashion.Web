import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  const [DailyBusinessResults, setDailyBusinessResults] = useState<any>({
    DailyRevenue: 0,
    quantityCancelOrder: 0,
    quantityNewOrder: 0,
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h3">Tổng quan </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          gap: 10,
        }}
      >
        <Box sx={{ flex: 3 }}>
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
              border: '1px solid',
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
            <Box></Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        ></Box>
      </Box>
    </Container>
  );
}
