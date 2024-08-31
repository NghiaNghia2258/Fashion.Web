import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TablePagination from '@mui/material/TablePagination';

import { useSettingsContext } from 'src/components/settings';
import { useState } from 'react';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const [optionPagination, setOptionPagination] = useState({
    pageSize: 5,
    pageIndex: 1,
    totalRows: 30,
  });

  const [products, setProducts] = useState([
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
        {
          size: 'XXL',
          color: 'Red',
          price: 120,
          inventory: 10,
        },
        {
          size: 'M',
          color: 'black',
          price: 120,
          inventory: 10,
        },
      ],
    },
    {
      id: 2,
      name: 'Product 2',
      mainImageUrl: '',
      price: 111,
      inventory: 100,
      productVariants: [
        {
          size: 'XL',
          color: 'black',
          price: 120,
          inventory: 10,
        },
      ],
    },
  ]);

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
              <Box className="cell" sx={{ flex: 6 }}>
                Tên sản phẩm
              </Box>
              <Box className="cell" sx={{ flex: 2 }}>
                Size
              </Box>
              <Box className="cell" sx={{ flex: 2 }}>
                Màu
              </Box>
              <Box className="cell" sx={{ flex: 4 }}>
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
            {products.map((product, index) => {
              return (
                <>
                  <Box
                    key={index}
                    className="row"
                    sx={{ backgroundColor: '#fff', borderBottom: '1px solid' }}
                  >
                    <Box
                      className="cell"
                      sx={{ width: 10, cursor: 'pointer' }}
                      onClick={() => {
                        product.isActive = !product.isActive;
                        setProducts([...products]);
                      }}
                    >
                      {product.isActive ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
                    </Box>

                    <Box className="cell" sx={{ flex: 1, '& p': { paddingLeft: '8px' } }}>
                      <p>{index + 1}</p>
                    </Box>
                    <Box
                      component="img"
                      src={`https://th.bing.com/th/id/OIP.yWyGljqH30lzaGRF2seM5QHaDt?rs=1&pid=ImgDetMain`}
                      sx={{ width: '50px', height: '50px', borderRadius: 1, flex: 1 }}
                      alt="Quảng cáo"
                    />
                    <Box className="cell" sx={{ flex: 6 }}>
                      {product.name}
                    </Box>
                    <Box className="cell" sx={{ flex: 2 }}>
                      {product.isActive ? 'Active' : 'inActive'}
                    </Box>
                    <Box className="cell" sx={{ flex: 2 }}></Box>
                    <Box className="cell" sx={{ flex: 4 }}>
                      {product.price}
                    </Box>
                    <Box className="cell" sx={{ flex: 2 }}>
                      {product.inventory}
                    </Box>
                    <Box className="cell" sx={{ flex: 2 }}>
                      <Box
                        className="button-action"
                        onClick={() => {
                          router.replace(`/dashboard/product/product-detail/${product.id}`);
                        }}
                      >
                        Xem
                      </Box>
                      <Box className="button-action">Xóa</Box>
                    </Box>
                  </Box>
                  {product.isActive
                    ? product.productVariants.map((v) => {
                        return (
                          <Box
                            key={index * 2 + 3}
                            className="row"
                            sx={{ backgroundColor: '#fff', borderBottom: '1px solid' }}
                          >
                            <Box className="cell"></Box>

                            <Box
                              className="cell"
                              sx={{ flex: 1, '& p': { paddingLeft: '8px' } }}
                            ></Box>
                            <Box
                              component="img"
                              src={`https://th.bing.com/th/id/OIP.yWyGljqH30lzaGRF2seM5QHaDt?rs=1&pid=ImgDetMain`}
                              sx={{ width: '50px', height: '50px', borderRadius: 1, flex: 1 }}
                              alt="Quảng cáo"
                            />
                            <Box className="cell" sx={{ flex: 6 }}></Box>
                            <Box className="cell" sx={{ flex: 2 }}>
                              {v.size}
                            </Box>
                            <Box className="cell" sx={{ flex: 2 }}>
                              {v.color}
                            </Box>
                            <Box className="cell" sx={{ flex: 4 }}>
                              {v.price}
                            </Box>
                            <Box className="cell" sx={{ flex: 2 }}>
                              {v.inventory}
                            </Box>
                            <Box className="cell" sx={{ flex: 2 }}></Box>
                          </Box>
                        );
                      })
                    : null}
                </>
              );
            })}
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 15]}
              rowsPerPage={optionPagination.pageSize}
              page={optionPagination.pageIndex - 1}
              onPageChange={(e, newPage) => {
                setOptionPagination({
                  pageSize: optionPagination.pageSize,
                  pageIndex: newPage + 1,
                  totalRows: optionPagination.totalRows,
                });
              }}
              onRowsPerPageChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setOptionPagination({
                  pageSize: parseInt(event.target.value, 10),
                  pageIndex: 1,
                  totalRows: optionPagination.totalRows,
                });
              }}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
              labelRowsPerPage="Số sản phẩm/trang"
              count={optionPagination.totalRows}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
