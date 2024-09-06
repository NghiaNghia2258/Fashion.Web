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

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { useSettingsContext } from 'src/components/settings';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import Button from '@mui/material/Button';

import AlertDialog from 'src/components/dialog/alert-dialog';
import { OptionFilterProduct } from 'src/sevices/paramas/option-filter-product';
import ProductService from 'src/sevices/api/product-services';
import { ProductDto } from 'src/sevices/DTOs/product-dto';
import CircularProgress from '@mui/material/CircularProgress';
import ProductCategoryService from 'src/sevices/api/product-category-services';
import { ProductCategoryDto } from 'src/sevices/DTOs/product-category-dto';
import { DashboardContext } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const settings = useSettingsContext();
  const toast = useContext(DashboardContext);
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [totalRecordsCount, settotalRecordsCount] = useState<number>(0);
  const [messageErr, setmessageErr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [idDelete, setidDelete] = useState<string>('');

  const handleDisagree = () => {
    setOpen(false);
    setidDelete('');
  };

  const handleAgree = () => {
    setOpen(false);
    handleDeleteProduct(idDelete);
  };
  const handleFilter = async () => {
    const productServices = new ProductService();
    setLoading(true);
    const res = await productServices.GetAll(optionFilter);
    if (res.isSucceeded) {
      setProducts(res.data ?? []);
      settotalRecordsCount(res.totalRecordsCount ?? 0);
    }
    setLoading(false);
  };

  const [categories, setcategories] = useState<ProductCategoryDto[]>([]);
  const [optionFilter, setoptionFilter] = useState<OptionFilterProduct>({
    pageSize: 5,
    pageIndex: 1,
    name: null,
    status: null,
    priceMin: null,
    priceMax: null,
    categoryId: null,
  });

  const [products, setProducts] = useState<ProductDto[]>([]);

  const handleDeleteProduct = async (id: string) => {
    const productServices = new ProductService();
    const res = await productServices.Delete(id);
    if (res.isSucceeded) {
      setProducts(products.filter((obj) => obj.id !== id));
    } else {
      toast?.ShowToast({
        severity: 'error',
        description: res.message,
        autoHideDuration: 3000,
        title: 'Xóa thất bại',
      });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productServices = new ProductService();
      const productCategoryService = new ProductCategoryService();
      productCategoryService.GetAll().then((res) => {
        setcategories(res.data ?? []);
      });
      const res = await productServices.GetAll(optionFilter);
      if (res.isSucceeded) {
        setProducts(res.data ?? []);
        settotalRecordsCount(res.totalRecordsCount ?? 0);
      } else {
        setmessageErr(res.message ?? 'Error');
      }
    };
    setLoading(true);
    fetchProducts().finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Danh sách sản phẩm</Typography>

        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}
        >
          <Button
            sx={{ height: '36px' }}
            onClick={() => {}}
            variant="contained"
            color="info"
            startIcon={<FileUploadIcon />}
            size="small"
          >
            Import Excel
          </Button>
          <Button
            sx={{ height: '36px' }}
            onClick={() => {}}
            variant="contained"
            color="info"
            startIcon={<FileDownloadIcon />}
            size="small"
          >
            Export Excel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.replace('/dashboard/product/create-product')}
          >
            Thêm sản phẩm mới
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
          label="Nhập tên sản phẩm"
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            flex: 8,
          }}
          onChange={(event) => {
            setoptionFilter({
              ...optionFilter,
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
            setoptionFilter({
              ...optionFilter,
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
            setoptionFilter({
              ...optionFilter,
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
            onChange={(event: SelectChangeEvent) => {
              setoptionFilter({
                ...optionFilter,
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
            value={optionFilter.categoryId || ''}
            onChange={(event: SelectChangeEvent) => {
              setoptionFilter({
                ...optionFilter,
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
          onClick={handleFilter}
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
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.15),
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
              <Box className="cell" sx={{ flex: 3 }}>
                Trạng thái
              </Box>
              <Box className="cell" sx={{ flex: 3 }}>
                Thao tác
              </Box>
            </Box>
          </Box>
          <Box className="list-products" sx={{ marginTop: 2, textAlign: 'center' }}>
            {loading ? (
              <CircularProgress sx={{ margin: '0 45%' }} />
            ) : products.length == 0 ? (
              'Không tìm thấy sản phẩm'
            ) : (
              products.map((product, index) => {
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
                      <Box className="cell" sx={{ flex: 2 }}></Box>
                      <Box className="cell" sx={{ flex: 2 }}></Box>
                      <Box className="cell" sx={{ flex: 4 }}>
                        {product.categoryName}
                      </Box>
                      <Box className="cell" sx={{ flex: 3 }}>
                        {/* {product.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })} */}
                      </Box>
                      <Box className="cell" sx={{ flex: 2 }}>
                        {(product.productVariants ?? []).reduce(
                          (accumulator, currentValue) =>
                            accumulator + (currentValue.inventory ?? 0),
                          0
                        )}
                      </Box>
                      <Box className="cell" sx={{ flex: 3 }}>
                        <Box
                          sx={{
                            ...((product.productVariants ?? []).reduce(
                              (accumulator, currentValue) =>
                                accumulator + (currentValue.inventory ?? 0),
                              0
                            ) === 0
                              ? { border: '3px solid #f44336', color: '#f44336' }
                              : { border: '3px solid #4caf50', color: '#4caf50' }),
                            fontSize: '13px',
                            padding: '3px 7px',
                            width: '100%',
                            borderRadius: '5px',
                          }}
                        >
                          {(product.productVariants ?? []).reduce(
                            (accumulator, currentValue) =>
                              accumulator + (currentValue.inventory ?? 0),
                            0
                          ) === 0
                            ? 'Hết hàng'
                            : 'Còn hàng'}
                        </Box>
                      </Box>
                      <Box className="cell" sx={{ flex: 3 }}>
                        <Box
                          className="button-action"
                          onClick={() => {
                            router.replace(`/dashboard/product/product-detail/${product.id}`);
                          }}
                        >
                          <EditIcon />
                        </Box>
                        <Box className="button-action">
                          <DeleteIcon
                            onClick={() => {
                              setidDelete(product.id ?? '');
                              setOpen(true);
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    {product.isActive
                      ? (product.productVariants ?? []).map((v) => {
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
                                {v.price
                                  ? v.price.toLocaleString('vi-VN', {
                                      style: 'currency',
                                      currency: 'VND',
                                    })
                                  : 0}
                              </Box>
                              <Box className="cell" sx={{ flex: 2 }}>
                                {v.inventory}
                              </Box>
                              <Box className="cell" sx={{ flex: 3 }}>
                                <Box
                                  sx={{
                                    ...(v.inventory === 0
                                      ? { border: '3px solid #f44336', color: '#f44336' }
                                      : { border: '3px solid #4caf50', color: '#4caf50' }),
                                    fontSize: '13px',
                                    padding: '3px 7px',
                                    width: '100%',
                                    borderRadius: '5px',
                                  }}
                                >
                                  {v.inventory === 0 ? 'Hết hàng' : 'Còn hàng'}
                                </Box>
                              </Box>
                              <Box className="cell" sx={{ flex: 3 }}>
                                {''}
                              </Box>
                            </Box>
                          );
                        })
                      : null}
                  </>
                );
              })
            )}

            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 15]}
              rowsPerPage={optionFilter.pageSize}
              page={optionFilter.pageIndex - 1}
              onPageChange={(e, newPage) => {
                setoptionFilter({
                  ...optionFilter,
                  pageIndex: newPage + 1,
                });
              }}
              onRowsPerPageChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setoptionFilter({
                  ...optionFilter,
                  pageSize: parseInt(event.target.value, 10),
                  pageIndex: 1,
                });
              }}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
              labelRowsPerPage="Số sản phẩm/trang"
              count={totalRecordsCount}
            />
          </Box>
        </Box>
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
