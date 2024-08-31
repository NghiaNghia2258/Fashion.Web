import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TablePagination from '@mui/material/TablePagination';

import { useSettingsContext } from 'src/components/settings';
import { useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import Button from '@mui/material/Button';

import NumberFormat from 'react-number-format';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const settings = useSettingsContext();
  const router = useRouter();

  const [categories, setcategories] = useState([
    {
      id: '1asd-12as',
      name: 'Áo',
    },
    {
      id: '2asd-12as',
      name: 'Quần',
    },
    {
      id: '3asd-12as',
      name: 'Giày',
    },
  ]);
  const [optionPagination, setOptionPagination] = useState({
    pageSize: 5,
    pageIndex: 1,
    totalRows: 30,
    name: null,
    status: null,
    priceMin: null,
    priceMax: null,
    categoryId: null,
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      mainImageUrl: '',
      price: 431999,
      inventory: 10,
      categoryId: '3asd-12as',
      categoryName: 'Quần',
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
      id: 1,
      name: 'Product 1',
      mainImageUrl: '',
      price: 431999,
      inventory: 10,
      categoryId: '3asd-12as',
      categoryName: 'Quần',
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
      id: 1,
      name: 'Product 1',
      mainImageUrl: '',
      price: 431999,
      inventory: 10,
      categoryId: '3asd-12as',
      categoryName: 'Quần',
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
      id: 1,
      name: 'Product 1',
      mainImageUrl: '',
      price: 431999,
      inventory: 10,
      categoryId: '3asd-12as',
      categoryName: 'Quần',
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
      price: 120000,
      inventory: 100,
      categoryId: '3asd-12as',
      categoryName: 'Áo',
      productVariants: [
        {
          size: 'XL',
          color: 'black',
          price: 120000,
          inventory: 10,
        },
      ],
    },
  ]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Danh sách sản phẩm </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.replace('/dashboard/product/create-product')}
        >
          Thêm sản phẩm mới
          <ChevronRightIcon fontSize="small" />
        </Button>
      </Box>

      <Box
        sx={{
          mt: 5,
          padding: '10px 20px',
          display: 'flex',
          gap: 2,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Nhập tên sản phẩm"
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            flex: 8,
          }}
          onChange={(event) => {
            setOptionPagination({
              ...optionPagination,
              name: event.target.value,
            });
          }}
        />
        <TextField
          id="outlined-number"
          label="Giá Min"
          type="number"
          sx={{
            backgroundColor: '#fff',
            flex: 3,
          }}
          onChange={(event: any) => {
            setOptionPagination({
              ...optionPagination,
              priceMin: event.target.value ? parseInt(event.target.value) : null,
            });
          }}
        />
        <TextField
          id="outlined-number"
          label="Giá Max"
          type="number"
          sx={{
            backgroundColor: '#fff',
            flex: 3,
          }}
          onChange={(event: any) => {
            setOptionPagination({
              ...optionPagination,
              priceMax: event.target.value ? parseInt(event.target.value) : null,
            });
          }}
        />

        <FormControl
          sx={{
            backgroundColor: '#fff',
            flex: 3,
          }}
        >
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={optionPagination.status}
            onChange={(event: SelectChangeEvent) => {
              setOptionPagination({
                ...optionPagination,
                status: parseInt(event.target.value),
              });
            }}
          >
            <MenuItem value={1}>Còn hàng</MenuItem>
            <MenuItem value={0}>Hết hàng</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          sx={{
            backgroundColor: '#fff',
            flex: 3,
          }}
        >
          <InputLabel>Loại sản phẩm</InputLabel>
          <Select
            value={optionPagination.categoryId}
            onChange={(event: SelectChangeEvent) => {
              setOptionPagination({
                ...optionPagination,
                categoryId: event.target.value,
              });
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={() => {
            console.log(optionPagination);
          }}
          variant="contained"
          color="success"
          sx={{
            flex: 1,
          }}
        >
          Lọc
        </Button>
      </Box>

      <Box
        sx={{
          mt: 5,
          padding: '10px 80px',
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
              gap: 1,
              '& .cell': {
                display: 'flex',
                padding: '0px 5px',
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
                Loại sản phẩm
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
          <Box className="list-products" sx={{ marginTop: 2 }}>
            {products.map((product, index) => {
              return (
                <>
                  <Box
                    key={index}
                    className="row"
                    sx={{ backgroundColor: '#fff', borderBottom: '1px solid #b0aeae' }}
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
                      sx={{ width: '40px', height: '40px', borderRadius: 1, flex: 1 }}
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
                      {product.categoryName}
                    </Box>
                    <Box className="cell" sx={{ flex: 3 }}>
                      {product.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
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
                          <Box key={index * 2 + 3} className="row" sx={{ marginTop: '5px' }}>
                            <Box className="cell"></Box>

                            <Box
                              className="cell"
                              sx={{ flex: 1, '& p': { paddingLeft: '8px' } }}
                            ></Box>
                            <Box
                              component="img"
                              src={`https://th.bing.com/th/id/OIP.yWyGljqH30lzaGRF2seM5QHaDt?rs=1&pid=ImgDetMain`}
                              sx={{ width: '40px', height: '40px', borderRadius: 1, flex: 1 }}
                              alt="Quảng cáo"
                            />
                            <Box className="cell" sx={{ flex: 6 }}></Box>
                            <Box className="cell" sx={{ flex: 2 }}>
                              {v.size}
                            </Box>
                            <Box className="cell" sx={{ flex: 2 }}>
                              {v.color}
                            </Box>
                            <Box className="cell" sx={{ flex: 4 }} />
                            <Box className="cell" sx={{ flex: 3 }}>
                              {v.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              })}
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
                  ...optionPagination,
                  pageIndex: newPage + 1,
                });
              }}
              onRowsPerPageChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setOptionPagination({
                  ...optionPagination,
                  pageSize: parseInt(event.target.value, 10),
                  pageIndex: 1,
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
