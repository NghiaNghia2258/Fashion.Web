import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { useEffect, useState } from 'react';
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

// ----------------------------------------------------------------------

export default function POSv1View() {
  const settings = useSettingsContext();

  const [isScreen1, setIsScreen1] = useState<boolean>(true);
  const [isScreen2, setIsScreen2] = useState<boolean>(false);
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);

  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [categories, setCategories] = useState<ProductCategoryDto[]>([]);

  const [orderSelected, setOrderSelected] = useState<OrderDto>({});
  const [itemsOfOrderSelected, setItemsOfOrderSelected] = useState<OrderItemDto[]>([]);
  const [variantOfProductSelected, setVariantOfProductSelected] = useState<ProductVariantDto[]>([]);

  useEffect(() => {
    const orderSevice = new OrderService();
    setLoadingOrder(true);
    orderSevice.GetAll(new OptionFilterOrder()).then((res) => {
      setOrders(res.data);
      setLoadingOrder(false);
    });
  }, [isScreen1]);
  useEffect(() => {
    const productService = new ProductService();
    setLoadingProduct(true);
    productService
      .GetAll(new OptionFilterProduct())
      .then((res) => {
        setProducts(res.data);
      })
      .finally(() => setLoadingProduct(false));
    const productCategoryService = new ProductCategoryService();
    productCategoryService.GetAll().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleAddToOrder = async (product: ProductDto): Promise<void> => {};
  const handlePayment = async (order: OrderDto): Promise<void> => {};
  const handleFilterProductByCategory = async (
    category: ProductCategoryDto | null
  ): Promise<void> => {};
  const handleFilterProductByWord = async (word: string | null): Promise<void> => {};

  const renderListOrder = (): void => {};
  const renderListProduct = (): void => {};
  const renderListCategory = () => {
    categories.map((category) => (
      <Box
        onClick={() => {
          const productService = new ProductService();
          setLoadingProduct(true);
          productService
            .GetAll({
              pageIndex: 1,
              pageSize: 10,
              categoryId: category.id,
            })
            .then((res) => {
              setProducts(res.data);
            })
            .finally(() => setLoadingProduct(false));
        }}
      >
        {category.name}
      </Box>
    ));
  };

  if (isScreen1) {
  }

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{
        mt: 5,
        width: 1,
        height: 320,
        borderRadius: 2,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    ></Container>
  );
}
