import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

//import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function CreateProductView() {
  const settings = useSettingsContext();

  const products = [
    {
      id: 1,
      name: 'Product 1',
      mainImageUrl: '',
      price: 100,
      inventory: 10,
      productVariants: [
        {
          size: 'XL',
          color: 'black',
          price: 120,
          inventory: 10,
        },
      ],
    },
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4">Danh sách sản phẩm </Typography>

      <Box
        sx={{
          mt: 5,
          height: 100,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      ></Box>

      <Box
        sx={{
          mt: 5,
          padding: '10px 20px',
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Box
          className="table"
          sx={{
            width: '100%',
            '& .row': {
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0',
              marginTop: '10px',
              gap: 2,
              '& .cell': {
                display: 'flex',
                gap: 1,
              },
            },
          }}
        >
          <Box className="head">
            <Box className="row">
              <Box className="cell" sx={{ width: 10 }}></Box>
              <Box className="cell" sx={{ flex: 1 }}>
                STT
              </Box>
              <Box className="cell" sx={{ flex: 1 }}>
                Ảnh
              </Box>
              <Box className="cell" sx={{ flex: 5 }}>
                Tên sản phẩm
              </Box>
              <Box className="cell" sx={{ flex: 2 }}>
                Size
              </Box>
              <Box className="cell" sx={{ flex: 2 }}>
                Màu
              </Box>
              <Box className="cell" sx={{ flex: 3 }}>
                Giá bán
              </Box>
              <Box className="cell" sx={{ flex: 2 }}>
                Tồn kho
              </Box>
              <Box className="cell" sx={{ flex: 2 }}>
                Thao tác
              </Box>
            </Box>
          </Box>
          <Box className="list-products">
            <Box className="row" sx={{ backgroundColor: '#fff', borderBottom: '1px solid' }}>
              <Box className="cell" sx={{ width: 10 }}></Box>

              <Box className="cell" sx={{ flex: 1, '& p': { paddingLeft: '8px' } }}>
                <p>10</p>
              </Box>
              <Box
                component="img"
                src={`https://th.bing.com/th/id/OIP.yWyGljqH30lzaGRF2seM5QHaDt?rs=1&pid=ImgDetMain`}
                sx={{ width: '50px', height: '50px', borderRadius: 1, flex: 1 }}
                alt="Quảng cáo"
              />
              <Box className="cell" sx={{ flex: 5 }}>
                iPhone 12 Pro
              </Box>
              <Box className="cell" sx={{ flex: 2 }}></Box>
              <Box className="cell" sx={{ flex: 2 }}></Box>
              <Box className="cell" sx={{ flex: 3 }}>
                299,000 đ
              </Box>
              <Box className="cell" sx={{ flex: 2 }}>
                500
              </Box>
              <Box className="cell" sx={{ flex: 2 }}>
                <Box className="button-action">Xem</Box>
                <Box className="button-action">Xóa</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
