import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { useContext, useEffect, useRef, useState } from 'react';
import { OrderDto } from 'src/sevices/DTOs/order-dto';
import { ProductDto } from 'src/sevices/DTOs/product-dto';
import { ProductCategoryDto } from 'src/sevices/DTOs/product-category-dto';
import { OrderItemDto } from 'src/sevices/DTOs/order-item-dto';
import { ProductVariantDto } from 'src/sevices/DTOs/product-variant-dto';
import OrderService from 'src/sevices/api/order-services';
import ProductService from 'src/sevices/api/product-services';
import ProductCategoryService from 'src/sevices/api/product-category-services';
import { OptionFilterProduct } from 'src/sevices/paramas/option-filter-product';
import { OptionFilterOrder } from 'src/sevices/paramas/option-filter-order';
import OrderItemService from 'src/sevices/api/order-item-services';
import { Button, TablePagination, TextField } from '@mui/material';
import { InputFile } from 'src/components/file-thumbnail';

import CircularProgress from '@mui/material/CircularProgress';

import DiscountIcon from '@mui/icons-material/Discount';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SendIcon from '@mui/icons-material/Send';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Autocomplete from '@mui/material/Autocomplete';
import { CustomerDto } from 'src/sevices/DTOs/customer-dto';
import CreateCustomerView from '../customer-dashboard/view-create-customer';
import { DashboardContext } from 'src/layouts/dashboard';
import AlertDialog from 'src/components/dialog/alert-dialog';
import CustomerService from 'src/sevices/api/customer-service';

// ----------------------------------------------------------------------

export default function POSv1View() {
  const settings = useSettingsContext();
  const toast = useContext(DashboardContext);

  const [isScreen1, setIsScreen1] = useState<boolean>(true);
  const [isScreen2, setIsScreen2] = useState<boolean>(false);
  const [isOpenAutoComplate, setIsOpenAutoComplate] = useState<boolean>(false);

  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);
  const [isErrGetVoucher, setIsErrGetVoucher] = useState<boolean>(false);

  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [categories, setCategories] = useState<ProductCategoryDto[]>([]);

  const [orderSelected, setOrderSelected] = useState<OrderDto>({});
  const [productSelected, setProductSelected] = useState<OrderDto>({});
  const [itemsOfOrderSelected, setItemsOfOrderSelected] = useState<OrderItemDto[]>([]);
  const [variantOfProductSelected, setVariantOfProductSelected] = useState<ProductVariantDto[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);

  const [productVariantSelected, setProductVariantSelected] = useState<ProductVariantDto>({});
  const [optionDiscount, setOptionDiscount] = useState<any>({});

  const [newOrderItem, setNewOrderItem] = useState<OrderItemDto>({
    quantity: 1,
  });
  const [optionFilter, setoptionFilter] = useState<OptionFilterProduct>({
    pageSize: 5,
    pageIndex: 1,
    name: null,
    categoryId: null,
  });
  const [totalRecordsCount, setTotalRecordsCount] = useState<number>(0);

  const [isOpenDialogCreateCustomer, setIsOpenDialogCreateCustomer] = useState<boolean>(false);
  const [isOpenDialogProductVariant, setIsOpenDialogProductVariant] = useState<boolean>(false);
  const [isOpenDialogWriteNote, setIsOpenDialogWriteNote] = useState<boolean>(false);
  const [isOpenDialogDiscount, setIsOpenDialogDiscount] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleDisagree = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);

    const orderSevice = new OrderService();
    setLoadingOrder(true);
    orderSevice.GetAll(new OptionFilterOrder()).then((res) => {
      setOrders(res.data);
      setLoadingOrder(false);
    });
    orderSelected.status = 6;
    orderSevice.Update(orderSelected).then((res) => {
      if (res.isSucceeded) {
        setIsScreen1(true);
        setIsScreen2(false);
      } else {
        toast?.ShowToast({
          severity: 'error',
          description: res.message,
          autoHideDuration: 3000,
          title: 'Có lỗi xảy ra',
        });
      }
    });
    setOrderSelected({});
    setItemsOfOrderSelected([]);
    setVariantOfProductSelected([]);
  };
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Xóa timeout cũ nếu có
      }
      timeoutId = setTimeout(() => {
        func(...args); // Gọi hàm với các tham số truyền vào sau khi hết delay
      }, delay);
    };
  };
  const callApiSearchProduct = async (searchTerm: string) => {
    setLoadingProduct(true);
    const productService = new ProductService();
    const res = await productService.GetAll({
      ...optionFilter,
      name: searchTerm,
    });
    setProducts(res.data);
    setLoadingProduct(false);
  };

  const callApiSearchCustomer = async (searchTerm: string) => {
    const customerService = new CustomerService();
    const res = await customerService.GetAll({
      pageSize: 10,
      pageIndex: 1,
      nameOrPhone: searchTerm,
    });
    setCustomers(res.data);
  };

  const debouncedApiCall = useRef(debounce(callApiSearchProduct, 500)).current;
  const debouncedApiCallSearchCustomer = useRef(debounce(callApiSearchCustomer, 500)).current;

  useEffect(() => {
    const orderSevice = new OrderService();
    setLoadingOrder(true);
    orderSevice.GetAll(new OptionFilterOrder()).then((res) => {
      setOrders(res.data);
      setLoadingOrder(false);
    });
  }, []);
  useEffect(() => {
    const productService = new ProductService();
    setLoadingProduct(true);
    productService
      .GetAll(optionFilter)
      .then((res) => {
        setProducts(res.data);
        setTotalRecordsCount(res.totalRecordsCount ?? 0);
      })
      .finally(() => setLoadingProduct(false));
    const productCategoryService = new ProductCategoryService();
    productCategoryService.GetAll().then((res) => {
      setCategories(res.data);
    });
  }, []);
  useEffect(() => {
    const orderItemSevice = new OrderItemService();
    //setLoadingOrder(true);
    orderItemSevice.GetByOrderId(orderSelected.id).then((res) => {
      setItemsOfOrderSelected(res.data);
      //setLoadingOrder(false);
    });
  }, [orderSelected]);
  useEffect(() => {
    const colors = Array.from(
      new Set(variantOfProductSelected.flatMap((variant) => variant.color))
    );

    const sizes = Array.from(new Set(variantOfProductSelected.flatMap((variant) => variant.size)));
    setColors(
      colors.map((color) => {
        if (!productVariantSelected.color && !productVariantSelected.size) {
          return {
            color: color,
            isDisabled:
              variantOfProductSelected.filter((p) => p.color === color && (p.inventory ?? 0) > 0)
                .length === 0,
          };
        } else if (productVariantSelected.color && !productVariantSelected.size) {
          return {
            color: color,
            isActivate: productVariantSelected.color === color,
            isDisabled:
              variantOfProductSelected.filter((p) => p.color === color && (p.inventory ?? 0) > 0)
                .length === 0,
          };
        } else if (productVariantSelected.size && !productVariantSelected.color) {
          return {
            color: color,
            isDisabled:
              variantOfProductSelected.filter(
                (p) =>
                  p.color === color &&
                  (p.inventory ?? 0) > 0 &&
                  p.size === productVariantSelected.size
              ).length === 0,
          };
        } else {
          return {
            color: color,
            isDisabled:
              variantOfProductSelected.filter(
                (p) =>
                  p.color === color &&
                  (p.inventory ?? 0) > 0 &&
                  p.size === productVariantSelected.size
              ).length === 0,
            isActivate: productVariantSelected.color === color,
          };
        }
      })
    );
    setSizes(
      sizes.map((size) => {
        if (!productVariantSelected.size && !productVariantSelected.color) {
          return {
            size: size,
            isDisabled:
              variantOfProductSelected.filter((p) => p.size === size && (p.inventory ?? 0) > 0)
                .length === 0,
          };
        } else if (productVariantSelected.size && !productVariantSelected.color) {
          return {
            size: size,
            isActivate: productVariantSelected.size === size,
            isDisabled:
              variantOfProductSelected.filter((p) => p.size === size && (p.inventory ?? 0) > 0)
                .length === 0,
          };
        } else if (productVariantSelected.color && !productVariantSelected.size) {
          return {
            size: size,
            isDisabled:
              variantOfProductSelected.filter(
                (p) =>
                  p.size === size &&
                  (p.inventory ?? 0) > 0 &&
                  p.color === productVariantSelected.color
              ).length === 0,
          };
        } else {
          return {
            size: size,
            isDisabled:
              variantOfProductSelected.filter(
                (p) =>
                  p.size === size &&
                  (p.inventory ?? 0) > 0 &&
                  p.color === productVariantSelected.color
              ).length === 0,
            isActivate: productVariantSelected.size === size,
          };
        }
      })
    );
  }, [productVariantSelected, variantOfProductSelected]);

  const dialogProductVariant = (
    <Box
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
        <Box className="head" sx={{ display: 'flex', gap: 3 }}>
          <InputFile
            imgSx={{ width: '80px', height: '80px', borderRadius: 1 }}
            file={
              'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg'
            }
            imageView
          />
          <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', justifyContent: 'end' }}>
            <Typography variant="h6" sx={{ color: 'red' }}>
              {(
                (
                  variantOfProductSelected.filter(
                    (v) =>
                      v.color === productVariantSelected.color &&
                      v.size === productVariantSelected.size
                  )[0] ?? {}
                ).price ?? ''
              ).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Typography>
            <Typography variant="body2">{productSelected.name}</Typography>
          </Box>
        </Box>
        <Box className="color" sx={{ margin: '15px 0' }}>
          <Typography variant="body2">Màu</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {colors.map((item, index) => (
              <Box
                key={index}
                onClick={() => {
                  if (item.isDisabled) return;
                  setProductVariantSelected({
                    ...productVariantSelected,
                    color: item.isActivate ? undefined : item.color,
                  });
                }}
                sx={{
                  fontSize: '13px',
                  border: `1px solid ${item.isActivate ? 'red' : 'black'}`,
                  color: `${item.isActivate ? 'red' : 'black'}`,
                  padding: '5px 7px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  opacity: item.isDisabled ? 0.3 : 1,
                }}
              >
                {item.color}
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="size" sx={{ margin: '15px 0' }}>
          <Typography variant="body2">Kích cỡ</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {sizes.map((item, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => {
                    if (item.isDisabled) return;

                    setProductVariantSelected({
                      ...productVariantSelected,
                      size: item.isActivate ? undefined : item.size,
                    });
                  }}
                  sx={{
                    fontSize: '13px',
                    border: `1px solid ${item.isActivate ? 'red' : 'black'}`,
                    color: `${item.isActivate ? 'red' : 'black'}`,
                    padding: '5px 7px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    opacity: item.isDisabled ? 0.3 : 1,
                  }}
                >
                  {item.size}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box className="quantity" sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
          <Typography variant="body2">Số lượng</Typography>
          <TextField
            variant="standard"
            size="small"
            type="number"
            value={newOrderItem.quantity}
            onChange={(e) => {
              if (parseInt(e.target.value, 10) > 1) {
                setNewOrderItem({
                  ...newOrderItem,
                  quantity: parseInt(e.target.value, 10),
                });
              } else {
                e.target.value = undefined;
                setNewOrderItem({
                  ...newOrderItem,
                  quantity: undefined,
                });
              }
            }}
          />
        </Box>
        <Box
          className="discountValue"
          sx={{ display: 'flex', gap: 1, alignItems: 'end', margin: '10px 0' }}
        >
          <Typography variant="body2">Chiết khấu giá trị</Typography>
          <TextField
            variant="standard"
            size="small"
            type="number"
            value={newOrderItem.discountValue}
            onChange={(e) => {
              if (parseInt(e.target.value, 10) > 1) {
                setNewOrderItem({
                  ...newOrderItem,
                  discountValue: parseInt(e.target.value, 10),
                });
              } else {
                e.target.value = undefined;
                setNewOrderItem({
                  ...newOrderItem,
                  discountValue: undefined,
                });
              }
            }}
          />
        </Box>
        <Box className="discountPercent" sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
          <Typography variant="body2">Chiết khấu</Typography>
          <TextField
            sx={{ width: '5%' }}
            variant="standard"
            size="small"
            type="number"
            value={(newOrderItem.discountPercent ?? 0) * 100}
            onChange={(e) => {
              if (parseInt(e.target.value, 10) > 1) {
                setNewOrderItem({
                  ...newOrderItem,
                  discountPercent: parseInt(e.target.value, 10) / 100,
                });
              } else {
                e.target.value = undefined;
                setNewOrderItem({
                  ...newOrderItem,
                  discountPercent: undefined,
                });
              }
            }}
          />
          <Typography variant="body2"> %</Typography>
        </Box>
        <Box
          className="actions"
          sx={{
            borderTop: '1px solid #919eabcc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: 1,
            paddingTop: '10px',
            backgroundColor: '#fff',
            marginTop: '15px',
          }}
        >
          <Button
            sx={{ height: '40px', width: '80px' }}
            onClick={() => {
              setIsOpenDialogProductVariant(false);
              setProductVariantSelected({});
              setProductSelected({});
              setNewOrderItem({});
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
              setNewOrderItem({});
              setIsOpenDialogProductVariant(false);
              setProductVariantSelected({});
              setProductSelected({});
              itemsOfOrderSelected.push({
                ...newOrderItem,
                productVariantId: productVariantSelected.id,
                productVariantName: `${productSelected.name}-${productVariantSelected.color}/${productVariantSelected.size}`,
                imageUrl: productVariantSelected.imageUrl,
                unitPrice: variantOfProductSelected.filter(
                  (v) =>
                    v.color === productVariantSelected.color &&
                    v.size === productVariantSelected.size
                )[0].price,
              });
              setItemsOfOrderSelected(itemsOfOrderSelected);
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
    </Box>
  );

  const dialogWirteNote = (
    <Box
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
        <Box>
          <Typography variant="h6">Ghi chú đơn hàng</Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            placeholder="Ghi chú"
            variant="outlined"
            value={orderSelected.note}
            onChange={(e) => {
              setOrderSelected({ ...orderSelected, note: e.target.value });
            }}
          />
        </Box>
        <Box
          className="actions"
          sx={{
            borderTop: '1px solid #919eabcc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: 1,
            paddingTop: '10px',
            backgroundColor: '#fff',
            marginTop: '15px',
          }}
        >
          <Button
            sx={{ height: '40px', width: '80px' }}
            onClick={() => {
              setIsOpenDialogWriteNote(false);
              setOrderSelected({ ...orderSelected, note: '' });
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
              setIsOpenDialogWriteNote(false);
            }}
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            size="small"
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Box>
  );
  const dialogDiscount = (
    <Box
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
        <Box>
          <Typography variant="h6">Chiết khấu đơn hàng</Typography>
          <Box
            className="discountValue"
            sx={{ display: 'flex', gap: 1, alignItems: 'end', margin: '10px 0' }}
          >
            <Typography variant="body2">Chiết khấu giá trị</Typography>
            <TextField
              variant="standard"
              size="small"
              type="number"
              value={
                optionDiscount.discountValue
                  ? optionDiscount.discountValue
                  : orderSelected.discountValue
              }
              onChange={(e) => {
                if (parseInt(e.target.value, 10) > 1) {
                  setOptionDiscount({
                    ...optionDiscount,
                    discountValue: parseInt(e.target.value, 10),
                  });
                } else {
                  e.target.value = undefined;
                  setOptionDiscount({
                    ...optionDiscount,
                    discountValue: undefined,
                  });
                }
              }}
            />
          </Box>
          <Box className="discountPercent" sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
            <Typography variant="body2">Chiết khấu</Typography>
            <TextField
              sx={{ width: '5%' }}
              variant="standard"
              size="small"
              type="number"
              value={
                (optionDiscount.discountPercent
                  ? optionDiscount.discountPercent
                  : orderSelected.discountPercent) * 100
              }
              onChange={(e) => {
                if (parseInt(e.target.value, 10) > 1) {
                  setOptionDiscount({
                    ...optionDiscount,
                    discountPercent: parseInt(e.target.value, 10) / 100,
                  });
                } else {
                  e.target.value = undefined;
                  setOptionDiscount({
                    ...optionDiscount,
                    discountPercent: undefined,
                  });
                }
              }}
            />
            <Typography variant="body2"> %</Typography>
          </Box>
          <Box className="discountPercent" sx={{ display: 'flex', gap: 1, margin: '10px 0' }}>
            <Typography variant="body2">Voucher</Typography>
            <TextField
              sx={{ width: '45%' }}
              variant="standard"
              error={isErrGetVoucher}
              helperText={isErrGetVoucher ? 'Mã giảm giá không hợp lệ' : ''}
              size="small"
              type="text"
              value={
                optionDiscount.voucher
                  ? optionDiscount.voucher.voucherCode
                  : (orderSelected.voucher ?? {}).voucherCode
              }
              onBlur={async (e) => {
                const orderSevice = new OrderService();
                const res = await orderSevice.GetVoucher(e.target.value);
                if (res.isSucceeded) {
                  setOptionDiscount({
                    ...optionDiscount,
                    voucher: res.data,
                  });
                  setIsErrGetVoucher(false);
                } else {
                  setIsErrGetVoucher(true);
                }
              }}
            />
          </Box>
        </Box>
        <Box
          className="actions"
          sx={{
            borderTop: '1px solid #919eabcc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: 1,
            paddingTop: '10px',
            backgroundColor: '#fff',
            marginTop: '15px',
          }}
        >
          <Button
            sx={{ height: '40px', width: '80px' }}
            onClick={() => {
              setIsOpenDialogDiscount(false);
              setOptionDiscount({});
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
              setIsOpenDialogDiscount(false);
              setOptionDiscount({});
              setOrderSelected({
                ...orderSelected,
                discountValue: optionDiscount.discountValue
                  ? optionDiscount.discountValue
                  : orderSelected.discountValue,
                discountPercent: optionDiscount.discountPercent
                  ? optionDiscount.discountPercent
                  : orderSelected.discountPercent,
                voucher: optionDiscount.voucher,
              });
            }}
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            size="small"
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const handleFilterProductByCategory = async (
    category: ProductCategoryDto | null
  ): Promise<void> => {};
  const handleFilterProductByWord = async (word: string | null): Promise<void> => {};
  const handleSaveOrderToDB = async (): Promise<void> => {
    setOrderSelected({});
    setItemsOfOrderSelected([]);
    setVariantOfProductSelected([]);
    const orderSevice = new OrderService();
    setLoadingOrder(true);
    orderSevice.GetAll(new OptionFilterOrder()).then((res) => {
      setOrders(res.data);
      setLoadingOrder(false);
    });
    orderSevice.Update(orderSelected).then((res) => {
      if (res.isSucceeded) {
        setIsScreen1(true);
        setIsScreen2(false);
      } else {
        toast?.ShowToast({
          severity: 'error',
          description: res.message,
          autoHideDuration: 3000,
          title: 'Có lỗi xảy ra',
        });
      }
    });
  };

  const renderListOrder = orders.map((order) => (
    <Box
      onClick={() => {
        setOrderSelected(order);
        setIsScreen1(false);
        setIsScreen2(true);
      }}
      sx={{
        width: 150,
        height: 80,
        border: '1px solid',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: '100%',
        }}
      >
        {order.name ? order.name : order.code}
      </p>
    </Box>
  ));
  const renderListProduct = products.map((product, index) => (
    <Box
      key={index}
      onClick={() => {
        setVariantOfProductSelected(product.productVariants ?? []);
        setProductSelected(product);
        setIsOpenDialogProductVariant(true);
      }}
      sx={{
        border: '1px solid',
        width: '105px',
        cursor: 'pointer',
        borderRadius: '3px',
      }}
    >
      <Box>
        <InputFile
          imgSx={{ width: '105px', height: '80px', borderRadius: 1 }}
          file={
            'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg'
          }
          imageView
        />
      </Box>
      <Box
        padding={'10px 0'}
        sx={{
          '&:hover p': {
            color: 'red',
          },
        }}
      >
        <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 600, fontSize: '15px' }}>
          {product.name}
        </Typography>
      </Box>
    </Box>
  ));
  const renderListCategory = (
    <>
      <Box
        sx={{
          width: '100%',
          height: '80px',
          marginTop: 1,
          border: '1px solid',
          whiteSpace: 'wrap',
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: '10px',
          '&:hover': {
            opacity: 0.5,
          },
        }}
        onClick={() => {
          setoptionFilter({
            ...optionFilter,
            categoryId: null,
          });
          const productService = new ProductService();
          setLoadingProduct(true);
          productService
            .GetAll({
              ...optionFilter,
              categoryId: null,
            })
            .then((res) => {
              setProducts(res.data);
              setTotalRecordsCount(res.totalRecordsCount ?? 0);
            })
            .finally(() => setLoadingProduct(false));
        }}
      >
        Tất cả
      </Box>
      {categories.map((category, index) => (
        <Box
          key={index}
          sx={{
            width: '100%',
            height: '80px',
            marginTop: 1,
            border: '1px solid',
            whiteSpace: 'wrap',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            padding: '10px',
            '&:hover': {
              opacity: 0.5,
            },
          }}
          onClick={() => {
            setoptionFilter({
              ...optionFilter,
              categoryId: category.id,
            });
            const productService = new ProductService();
            setLoadingProduct(true);
            productService
              .GetAll({
                ...optionFilter,
                categoryId: category.id,
              })
              .then((res) => {
                setProducts(res.data);
                setTotalRecordsCount(res.totalRecordsCount ?? 0);
              })
              .finally(() => setLoadingProduct(false));
          }}
        >
          {category.name}
        </Box>
      ))}
    </>
  );
  const renderListOrderItem = itemsOfOrderSelected.map((orderItem) => {
    if (!orderItem.isDeleted) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
          <Box sx={{ flex: 2 }}>
            <InputFile
              imgSx={{ width: '40px', height: '40px', borderRadius: 1 }}
              file={
                'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg'
              }
              imageView
            />
          </Box>
          <Box sx={{ flex: 6 }}>
            <Typography sx={{ fontSize: '13px' }}>{orderItem.productVariantName}</Typography>
          </Box>
          <Box sx={{ flex: 3 }}>
            <Typography sx={{ fontSize: '14px' }}>
              {Math.floor(
                (orderItem.unitPrice ?? 0) * (1 - (orderItem.discountPercent ?? 0)) -
                  (orderItem.discountValue ?? 0)
              ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Typography>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography sx={{ fontSize: '14px', textAlign: 'center', paddingLeft: 2 }}>
              <TextField
                type="number"
                sx={{ width: '100%' }}
                value={orderItem.quantity ?? 0}
                variant="standard"
                size="small"
                onChange={(event: any) => {
                  setItemsOfOrderSelected([
                    ...itemsOfOrderSelected.map((item) => {
                      if (item.id === orderItem.id) {
                        return { ...item, quantity: parseInt(event.target.value, 10) };
                      }
                      return { ...item };
                    }),
                  ]);
                }}
              />
            </Typography>
          </Box>
          <Box sx={{ flex: 4 }}>
            <Typography sx={{ fontSize: '14px' }}>
              {(
                ((orderItem.unitPrice ?? 0) * (1 - (orderItem.discountPercent ?? 0)) -
                  (orderItem.discountValue ?? 0)) *
                (orderItem.quantity ?? 0)
              ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <DeleteIcon
              onClick={() => {
                setItemsOfOrderSelected(
                  itemsOfOrderSelected.map((item) => {
                    if (item.id === orderItem.id) {
                      return {
                        ...item,
                        isDeleted: true,
                      };
                    }
                    return { ...item };
                  })
                );
              }}
            />
          </Box>
        </Box>
      );
    }
  });

  if (isScreen1) {
    return (
      <Box key={1} sx={{ display: 'flex', gap: 1 }}>
        <Box
          key={3}
          sx={{
            flex: 7,
            display: 'flex',
            border: '1px solid',
            padding: '15px',
            borderRadius: 1,
            gap: 2,
          }}
        >
          {loadingOrder ? <CircularProgress key={4} sx={{ margin: '0 45%' }} /> : renderListOrder}
        </Box>
        <Box sx={{ flex: 3, height: 100, border: '1px solid', padding: '15px' }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              setIsScreen1(false);
              setIsScreen2(true);
              setOrderSelected({});
              const orderSevice = new OrderService();
              orderSevice.Create({}).then((res) => {
                if (!res.isSucceeded) {
                  setIsScreen1(true);
                  setIsScreen2(false);
                  toast?.ShowToast({
                    severity: 'error',
                    description: res.message,
                    autoHideDuration: 3000,
                    title: 'Có lỗi xảy ra',
                  });
                }
              });
            }}
          >
            Tạo mới hóa đơn
            <ChevronRightIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box key={2} sx={{ display: 'flex', gap: 1 }}>
      <Box
        sx={{
          flex: 8,
          display: 'flex',
          border: '1px solid',
          borderRadius: 1,
          gap: 2,
          height: '87vh',
        }}
      >
        <Box
          sx={{
            padding: ' 0 5px',
            paddingBottom: '5px',
            borderRight: '1px solid',
            flex: 2,
            height: '87vh',
            overflow: 'scroll',
            scrollbarWidth: 'none',
          }}
        >
          {renderListCategory}
        </Box>
        <Box sx={{ flex: 9, position: 'relative' }}>
          <Box marginBottom={2} sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
            <SearchIcon />
            <TextField
              variant="standard"
              label="Nhập tên sản phẩm"
              sx={{ width: '90%' }}
              onChange={(event) => {
                const searchTerm = event.target.value;
                debouncedApiCall(searchTerm); // Gọi hàm debounce
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              padding: '10px 0',
            }}
          >
            {loadingProduct ? <CircularProgress sx={{ margin: '0 45%' }} /> : renderListProduct}
          </Box>
          <TablePagination
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
            component="div"
            rowsPerPageOptions={[5, 10, 15]}
            rowsPerPage={optionFilter.pageSize}
            page={optionFilter.pageIndex - 1}
            onPageChange={(e, newPage) => {
              setoptionFilter({
                ...optionFilter,
                pageIndex: newPage + 1,
              });
              const productService = new ProductService();
              setLoadingProduct(true);
              productService
                .GetAll({
                  ...optionFilter,
                  pageIndex: newPage + 1,
                })
                .then((res) => {
                  setProducts(res.data);
                  setTotalRecordsCount(res.totalRecordsCount ?? 0);
                })
                .finally(() => setLoadingProduct(false));
            }}
            onRowsPerPageChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setoptionFilter({
                ...optionFilter,
                pageSize: parseInt(event.target.value, 10),
                pageIndex: 1,
              });
              const productService = new ProductService();
              setLoadingProduct(true);
              productService
                .GetAll({
                  ...optionFilter,
                  pageSize: parseInt(event.target.value, 10),
                  pageIndex: 1,
                })
                .then((res) => {
                  setProducts(res.data);
                  setTotalRecordsCount(res.totalRecordsCount ?? 0);
                })
                .finally(() => setLoadingProduct(false));
            }}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
            labelRowsPerPage="Số sản phẩm/trang"
            count={totalRecordsCount}
          />
        </Box>
      </Box>
      <Box
        sx={{ flex: 5, border: '1px solid', borderRadius: 1, overflow: 'hidden', height: '87vh' }}
      >
        <Box
          sx={{
            height: '24%',
            borderBottom: '1px solid',
            padding: '10px',
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Chi tiết hóa đơn
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
            <SearchIcon />
            <Box sx={{ width: '90%', position: 'relative' }}>
              <TextField
                variant="standard"
                placeholder="Nhập tên/SDT khách hàng"
                sx={{ width: '100%' }}
                size="small"
                type="text"
                onBlur={() => {
                  setTimeout(() => {
                    setIsOpenAutoComplate(false);
                  }, 250);
                }}
                onFocus={() => {
                  setIsOpenAutoComplate(true);
                }}
                onChange={(e) => {
                  debouncedApiCallSearchCustomer(e.target.value);
                }}
              />
              {isOpenAutoComplate ? (
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    border: '1px solid',
                    position: 'absolute',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    zIndex: 10,
                    top: 33,
                    overflow: 'scroll',
                    scrollbarWidth: 'none',
                  }}
                >
                  {customers.map((customer) => (
                    <Box
                      onClick={() => {
                        setOrderSelected({
                          ...orderSelected,
                          customer: customer,
                          customerName: customer.name,
                          customerPhone: customer.phone,
                          customerId: customer.id,
                        });
                      }}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px 30px',
                        cursor: 'pointer',
                        borderBottom: '1px solid',

                        '&:hover': {
                          backgroundColor: '#e8e8e8',
                        },
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                          {customer.name}
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#9c9b9b' }}>
                          Mã :{customer.code}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '13px', color: '#9c9b9b' }}>
                          SDT :{customer.phone}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : null}
            </Box>
            <PlaylistAddIcon
              onClick={() => {
                setIsOpenDialogCreateCustomer(true);
              }}
              sx={{ fontSize: '28px', cursor: 'pointer' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Box
              sx={{ display: 'flex', gap: 1, width: '45%', alignItems: 'end', marginTop: '5px' }}
            >
              <Typography sx={{ fontSize: 13 }}>Khách hàng: </Typography>
              <Typography sx={{ fontWeight: 700 }}>{orderSelected.customerName}</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', gap: 1, width: '45%', alignItems: 'end', marginTop: '5px' }}
            >
              <Typography sx={{ fontSize: 13 }}>Người tạo</Typography>
              <Typography sx={{ fontWeight: 700 }}>{orderSelected.createdName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, width: '45%', alignItems: 'end' }}>
              <Typography sx={{ fontSize: 13 }}>SDT: </Typography>
              <Typography sx={{ fontWeight: 700 }}>{orderSelected.customerPhone}</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, width: '45%', alignItems: 'end' }}>
              <Typography sx={{ fontSize: 13 }}>Ngày tạo</Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {orderSelected.createdAt?.toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: '55%',
            borderBottom: '1px solid',
            padding: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '5px',
              borderBottom: '1px solid',
            }}
          >
            <Box sx={{ flex: 2 }}></Box>
            <Box sx={{ flex: 6 }}>Tên sản phẩm</Box>
            <Box sx={{ flex: 3 }}>Đơn giá</Box>
            <Box sx={{ flex: 2, paddingLeft: 2 }}>SL</Box>
            <Box sx={{ flex: 4 }}>Thành tiền</Box>
            <Box sx={{ flex: 1 }}></Box>
          </Box>
          <Box sx={{ overflow: 'scroll', height: '90%', scrollbarWidth: 'none' }}>
            {renderListOrderItem}
          </Box>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid',
            height: '7%',
          }}
        >
          <DiscountIcon
            onClick={() => {
              setIsOpenDialogDiscount(true);
            }}
            sx={{
              padding: '5px',
              fontSize: '46px',
              color: '#fff',
              backgroundColor: '#00b8d9',
              height: '100%',
              cursor: 'pointer',
              marginRight: '2px',
            }}
          />
          <EditNoteIcon
            onClick={() => {
              setIsOpenDialogWriteNote(true);
            }}
            sx={{
              padding: '5px',
              fontSize: '46px',
              color: '#fff',
              backgroundColor: '#00b8d9',
              height: '100%',
              cursor: 'pointer',
              marginRight: '2px',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', height: '14%' }}>
          <Button
            sx={{ flex: 1, borderRadius: '0px' }}
            onClick={() => {
              setIsScreen1(true);
              setIsScreen2(false);
              setOrderSelected({});
              setItemsOfOrderSelected([]);
              setVariantOfProductSelected([]);
              const orderSevice = new OrderService();
              setLoadingOrder(true);
              orderSevice.GetAll(new OptionFilterOrder()).then((res) => {
                setOrders(res.data);
                setLoadingOrder(false);
              });
            }}
            variant="contained"
          >
            Thoát
          </Button>
          <Button
            sx={{ flex: 1, borderRadius: '0px' }}
            onClick={handleSaveOrderToDB}
            variant="contained"
          >
            Lưu
          </Button>
          <Button sx={{ flex: 1, borderRadius: '0px' }} onClick={() => {}} variant="contained">
            Tạm tính
          </Button>
          <Button
            sx={{ flex: 1, borderRadius: '0px' }}
            onClick={() => {
              setOpen(true);
            }}
            variant="contained"
          >
            Thanh toán
          </Button>
        </Box>
      </Box>

      {isOpenDialogCreateCustomer ? (
        <CreateCustomerView
          handleAgree={() => {
            setIsOpenDialogCreateCustomer(false);
          }}
          handleDisAgree={() => {
            setIsOpenDialogCreateCustomer(false);
          }}
        />
      ) : null}

      {isOpenDialogProductVariant ? dialogProductVariant : null}
      {isOpenDialogWriteNote ? dialogWirteNote : null}
      {isOpenDialogDiscount ? dialogDiscount : null}

      <AlertDialog
        isOpen={open}
        labelAgree="Xác nhận"
        labelDisagree="Hủy"
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        description=""
        title="Xác nhận thanh toán"
      />
    </Box>
  );
}
