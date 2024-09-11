import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { Button, TextField } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect, useContext } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DeleteIcon from '@mui/icons-material/Delete';

import BackspaceIcon from '@mui/icons-material/Backspace';
import SendIcon from '@mui/icons-material/Send';

import { InputFile } from 'src/components/file-thumbnail';

import AlertDialog from 'src/components/dialog/alert-dialog';
import { useRouter } from 'src/routes/hooks';

import { DashboardContext } from 'src/layouts/dashboard';
import ProductService from 'src/sevices/api/product-services';
import { ProductDto } from 'src/sevices/DTOs/product-dto';

import { SplashScreen } from 'src/components/loading-screen';
import ProductCategoryService from 'src/sevices/api/product-category-services';
import { ProductCategoryDto } from 'src/sevices/DTOs/product-category-dto';
import { ProductVariantDto } from 'src/sevices/DTOs/product-variant-dto';
import UploadService from 'src/sevices/api/upload-services';

// ----------------------------------------------------------------------

export default function CreateProductView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const toast = useContext(DashboardContext);
  const [loading, setloading] = useState<boolean>(false);
  const [categories, setcategories] = useState<ProductCategoryDto[]>([]);
  const [newProduct, setnewProduct] = useState<ProductDto>({
    name: '',
    categoryId: '',
    productVariants: [],
  });

  const [isErrInputName, setisErrInputName] = useState<boolean>(false);
  const [isErrInputDes, setisErrInputDes] = useState<boolean>(false);

  const [sizes, setsizes] = useState<string[]>([]);
  const [colors, setcolors] = useState<string[]>([]);
  const [price, setprice] = useState<number>(0);
  const [inventory, setinventory] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [details, setdetails] = useState<ProductVariantDto[]>([]);

  const [isOpenDialogCreate, setisOpenDialogCreate] = useState(false);
  const [isOpenDialogCancel, setisOpenDialogCancel] = useState(false);

  const handleDisagree = () => {
    setisOpenDialogCreate(false);
    setisOpenDialogCancel(false);
  };
  const handleCreateProduct = async () => {
    setloading(true);
    const uploadServices = new UploadService();
    newProduct.productVariants = await Promise.all(
      details.map(async (detail) => {
        const urlImaage = await uploadServices.UploadImage(detail.fileImage);
        return { ...detail, imageUrl: urlImaage, fileImage: undefined };
      })
    );

    newProduct.productImages = await Promise.all(
      images.map(async (img) => {
        const urlImaage = await uploadServices.UploadImage(img);
        return {
          imageUrl: urlImaage,
        };
      })
    );
    newProduct.mainImageUrl = await uploadServices.UploadImage(mainImage);
    const productServices = new ProductService();
    const res = await productServices.Create(newProduct);
    setloading(false);
    if (res.isSucceeded) {
      toast?.ShowToast({
        severity: 'success',
        description: 'Tạo sản phẩm thành công!',
        autoHideDuration: 3000,
        title: 'Thành công',
      });
      router.replace('/dashboard/product/products');
    } else {
      toast?.ShowToast({
        severity: 'error',
        description: res.message,
        autoHideDuration: 3000,
        title: 'Thất bại',
      });
    }
    setisOpenDialogCreate(false);
  };
  const handleAgreeCreate = async () => {
    if (isErrInputName || newProduct.name?.length === 0) {
      toast?.ShowToast({
        severity: 'error',
        description: 'Tên sản phẩm không hợp lệ',
        autoHideDuration: 3000,
        title: 'Thất bại',
      });
      setisErrInputName(true);
    } else if (isErrInputDes) {
      toast?.ShowToast({
        severity: 'error',
        description: 'Mô tả sản phẩm không hợp lệ',
        autoHideDuration: 3000,
        title: 'Thất bại',
      });
      setisErrInputDes(true);
    } else {
      await handleCreateProduct();
    }
    setisOpenDialogCreate(false);
  };
  const handleAgreeCancel = () => {
    setisOpenDialogCancel(false);
    router.replace('/dashboard/product/products');
  };

  useEffect(() => {
    const newDetails = [];
    let id = 1;
    if (colors.length === 0) {
      for (let j = 0; j < sizes.length; j += 1) {
        id += 1;
        newDetails.push({
          id: id.toLocaleString(),
          size: sizes[j],
          color: '',
          price: 0,
          inventory: 0,
        });
      }
    } else if (sizes.length === 0) {
      for (let j = 0; j < colors.length; j += 1) {
        id += 1;

        newDetails.push({
          id: id.toLocaleString(),
          size: '',
          color: colors[j],
          price: 0,
          inventory: 0,
        });
      }
    } else {
      for (let i = 0; i < sizes.length; i += 1) {
        for (let j = 0; j < colors.length; j += 1) {
          id += 1;
          newDetails.push({
            id: id.toLocaleString(),
            size: sizes[i],
            color: colors[j],
            price: 0,
            inventory: 0,
          });
        }
      }
    }
    setdetails(newDetails);
  }, [sizes, colors]);

  useEffect(() => {
    const productCategoryService = new ProductCategoryService();
    productCategoryService.GetAll().then((res) => {
      setcategories(res.data);
    });
  }, []);

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'xl'}
      sx={{
        borderRadius: 2,
        padding: '20px 10px',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.15),
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4">Thêm sản phẩm </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
        }}
      >
        <Box
          sx={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: '#fff',
            flex: 6,
            borderRadius: 1,
          }}
        >
          <Box>
            <Typography
              sx={{
                paddingBottom: '10px',
                borderBottom: '1px solid #919eabcc',
              }}
            >
              Thông tin chung
            </Typography>
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  width: '45%',
                }}
              >
                <Typography sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: 700 }}>
                  Tên sản phẩm <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  error={isErrInputName}
                  helperText={
                    isErrInputName ? 'Tên sản phẩm phải lớn hơn 6 ký tự và không được để trống' : ''
                  }
                  label="Nhập tên sản phẩm"
                  sx={{ width: '100%' }}
                  onChange={(event) => {
                    if (event.target.value.length < 6) {
                      setisErrInputName(true);
                    } else {
                      setisErrInputName(false);
                      setnewProduct({ ...newProduct, name: event.target.value });
                    }
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: '45%',
                }}
              >
                <Typography sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: 700 }}>
                  Loại sản phẩm
                </Typography>
                <FormControl
                  sx={{
                    backgroundColor: '#fff',
                    width: '100%',
                  }}
                >
                  <InputLabel>Loại sản phẩm</InputLabel>
                  <Select
                    value={newProduct.categoryId}
                    onChange={(event: SelectChangeEvent) => {
                      setnewProduct({ ...newProduct, categoryId: event.target.value });
                    }}
                  >
                    {categories.map((category: any) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              className="note"
              sx={{
                padding: '10px',
              }}
            >
              <Typography sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: 700 }}>
                Mô tả
              </Typography>
              <TextField
                error={isErrInputDes}
                helperText={isErrInputDes ? 'Mô tả sản phẩm phải nhỏ hơn 500 ký tự' : ''}
                placeholder="Nhập mô tả"
                multiline
                rows={12}
                fullWidth
                onChange={(event) => {
                  if (event.target.value.length > 500) {
                    setisErrInputDes(true);
                  } else {
                    setisErrInputDes(false);
                    setnewProduct({ ...newProduct, description: event.target.value });
                  }
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  paddingBottom: '10px',
                  borderBottom: '1px solid #919eabcc',
                  marginTop: '40px',
                }}
              >
                Chi tiết sản phẩm
              </Typography>

              <Box sx={{ padding: '10px' }}>
                <Typography sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: 700 }}>
                  Size
                </Typography>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  {sizes.map((size) => {
                    return (
                      <Box
                        sx={{
                          display: 'flex',
                          width: '19%',
                          alignItems: 'center',
                        }}
                      >
                        <TextField sx={{ width: '100%' }} value={size} size="small" />
                        <DeleteOutlineIcon
                          sx={{ fontSize: '26px', cursor: 'pointer' }}
                          onClick={() => {
                            const newSizes = sizes.filter((s) => s !== size);
                            setsizes(newSizes);
                          }}
                        />
                      </Box>
                    );
                  })}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '5px',
                      width: '15%',
                    }}
                  >
                    <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      onBlur={(event) => {
                        if (event.target.value) {
                          setsizes([...sizes, event.target.value]);
                          event.target.value = '';
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ padding: '10px', paddingTop: '0' }}>
                <Typography sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: 700 }}>
                  Màu sắc
                </Typography>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  {colors.map((color) => {
                    return (
                      <Box
                        sx={{
                          display: 'flex',
                          width: '19%',
                          alignItems: 'center',
                        }}
                      >
                        <TextField sx={{ width: '100%' }} value={color} size="small" />
                        <DeleteOutlineIcon
                          sx={{ fontSize: '26px', cursor: 'pointer' }}
                          onClick={() => {
                            const newcolors = colors.filter((s) => s !== color);
                            setcolors(newcolors);
                          }}
                        />
                      </Box>
                    );
                  })}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '5px',
                      width: '15%',
                    }}
                  >
                    <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      onBlur={(event) => {
                        if (event.target.value) {
                          setcolors([...colors, event.target.value]);
                          event.target.value = '';
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ padding: '10px', display: 'flex', gap: 2 }}>
                <Box>
                  <Typography
                    sx={{
                      marginBottom: '5px',
                      fontSize: '16px',
                      fontWeight: 700,
                      paddingBottom: '5px',
                    }}
                  >
                    Giá bán
                  </Typography>
                  <TextField
                    label="Giá bán"
                    type="number"
                    onChange={(event: any) => {
                      if (parseInt(event.target.value, 10) > 0) {
                        setprice(parseInt(event.target.value, 10));
                      } else {
                        event.target.value = undefined;
                        setprice(0);
                      }
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      marginBottom: '5px',
                      fontSize: '16px',
                      fontWeight: 700,
                      paddingBottom: '5px',
                    }}
                  >
                    Tồn kho
                  </Typography>
                  <TextField
                    label="Tồn kho"
                    type="number"
                    onChange={(event: any) => {
                      if (parseInt(event.target.value, 10) > 0) {
                        setinventory(parseInt(event.target.value, 10));
                      } else {
                        event.target.value = undefined;
                        setinventory(0);
                      }
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                  <Button
                    sx={{ height: '42px' }}
                    onClick={() => {
                      console.log(details);
                      const newDetails = details.map((detail) => {
                        return {
                          ...detail,
                          price: price,
                          inventory: inventory,
                        };
                      });
                      setdetails(newDetails);
                    }}
                    variant="contained"
                    color="success"
                  >
                    Áp dụng tất cả
                  </Button>
                </Box>
              </Box>

              <Box
                sx={{
                  marginTop: 4,
                  padding: '10px',
                  width: '70%',
                  border: '1px solid #919eabcc',
                  borderRadius: '10px',
                }}
              >
                <Box
                  className="head"
                  sx={{ display: 'flex', backgroundColor: '#e4e8edf0', padding: '15px 30px' }}
                >
                  <Box flex={2}>Ảnh</Box>
                  <Box flex={2}>Size</Box>
                  <Box flex={2}>Màu</Box>
                  <Box flex={3}>Giá bán</Box>
                  <Box flex={2}>Tồn kho</Box>
                  <Box flex={1}></Box>
                </Box>
                <Box className="list-detail">
                  {details.map((detail, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        padding: '10px 30px',
                        borderBottom: '1px solid #919eabcc',
                        alignItems: 'center',
                      }}
                    >
                      <Box flex={2}>
                        {detail.fileImage ? (
                          <InputFile
                            onClick={() => {
                              setdetails(
                                details.map((obj) => {
                                  if (obj.id === detail.id) {
                                    return {
                                      ...detail,
                                      fileImage: null,
                                    };
                                  } else {
                                    return obj;
                                  }
                                })
                              );
                            }}
                            file={detail.fileImage}
                            imageView
                            sx={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              border: '1px solid #919eabcc',
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              position: 'relative',
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              border: '1px solid #919eabcc',
                            }}
                          >
                            <TextField
                              type="file"
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 2,
                                '& input': {
                                  width: '40px',
                                  height: '40px',
                                  padding: 0,
                                  opacity: 0,
                                  cursor: 'pointer',
                                },
                              }}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                if (event.target.files !== null) {
                                  setdetails(
                                    details.map((obj) => {
                                      if (obj.id === detail.id) {
                                        return {
                                          ...detail,
                                          fileImage: (event.target.files ?? [])[0],
                                        };
                                      } else {
                                        return obj;
                                      }
                                    })
                                  );
                                }
                              }}
                            />
                            <DriveFolderUploadIcon
                              sx={{
                                position: 'absolute',
                                top: '29%',
                                left: '29%',
                                fontSize: '17px',
                                zIndex: 1,
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box flex={2}>
                        <TextField
                          sx={{ width: '80%' }}
                          type="text"
                          variant="standard"
                          size="small"
                          value={detail.size}
                          onChange={(event: any) => {
                            setdetails(
                              details.map((obj) => {
                                if (obj.id === detail.id) {
                                  return {
                                    ...detail,
                                    size: event.target.value,
                                  };
                                } else {
                                  return obj;
                                }
                              })
                            );
                          }}
                        />
                      </Box>
                      <Box flex={2}>
                        <TextField
                          sx={{ width: '80%' }}
                          type="text"
                          variant="standard"
                          size="small"
                          value={detail.color}
                          onChange={(event: any) => {
                            setdetails(
                              details.map((obj) => {
                                if (obj.id === detail.id) {
                                  return {
                                    ...detail,
                                    color: event.target.value,
                                  };
                                } else {
                                  return obj;
                                }
                              })
                            );
                          }}
                        />
                      </Box>
                      <Box flex={3}>
                        <TextField
                          sx={{ width: '80%' }}
                          type="number"
                          variant="standard"
                          size="small"
                          value={detail.price}
                          onChange={(event: any) => {
                            if (parseInt(event.target.value, 10) > 0) {
                              setdetails(
                                details.map((obj) => {
                                  if (obj.id === detail.id) {
                                    return {
                                      ...detail,
                                      price: parseInt(event.target.value, 10),
                                    };
                                  } else {
                                    return obj;
                                  }
                                })
                              );
                            } else {
                              event.target.value = undefined;
                              setdetails(
                                details.map((obj) => {
                                  if (obj.id === detail.id) {
                                    return {
                                      ...detail,
                                      price: 0,
                                    };
                                  } else {
                                    return obj;
                                  }
                                })
                              );
                            }
                          }}
                        />
                      </Box>
                      <Box flex={2}>
                        <TextField
                          sx={{ width: '80%' }}
                          type="number"
                          variant="standard"
                          size="small"
                          value={detail.inventory}
                          onChange={(event: any) => {
                            if (parseInt(event.target.value, 10) > 0) {
                              setdetails(
                                details.map((obj) => {
                                  if (obj.id === detail.id) {
                                    return {
                                      ...detail,
                                      inventory: parseInt(event.target.value, 10),
                                    };
                                  } else {
                                    return obj;
                                  }
                                })
                              );
                            } else {
                              event.target.value = undefined;
                              setdetails(
                                details.map((obj) => {
                                  if (obj.id === detail.id) {
                                    return {
                                      ...detail,
                                      inventory: 0,
                                    };
                                  } else {
                                    return obj;
                                  }
                                })
                              );
                            }
                          }}
                        />
                      </Box>
                      <Box flex={1}>
                        <DeleteIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            setdetails(details.filter((obj) => obj.id !== detail.id));
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                  <Box
                    onClick={() => {
                      const newDetail = {
                        id: (details.length + 1).toLocaleString(),
                        size: '',
                        color: '',
                        price: 0,
                        inventory: 0,
                        fileImage: null,
                      };
                      setdetails([...details, newDetail]);
                    }}
                    sx={{
                      marginTop: '5px',
                      fontSize: '28px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: '#e4e8edf0',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                  >
                    +
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: '#fff',
            flex: 3,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              paddingBottom: '10px',
              borderBottom: '1px solid #919eabcc',
            }}
          >
            Hình ảnh sản phẩm <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Box sx={{ padding: '10px', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {mainImage ? (
              <InputFile
                onClick={() => {
                  setMainImage(null);
                }}
                file={
                  mainImage ??
                  'http://103.153.69.217:5055/api/files/images/8b79877d-00b3-46d5-aaf0-5af6db65f70d.jpeg'
                }
                imageView
                sx={{
                  width: '336px',
                  height: '336px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: '1px solid #919eabcc',
                }}
              />
            ) : null}

            {mainImage ? null : (
              <Box
                sx={{
                  position: 'relative',
                  width: '336px',
                  height: '336px',
                  borderRadius: '10px',
                  border: '1px solid #919eabcc',
                }}
              >
                <TextField
                  type="file"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    '& input': {
                      width: '336px',
                      height: '336px',
                      padding: 0,
                      opacity: 0,
                      cursor: 'pointer',
                    },
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files) {
                      setMainImage(event.target.files[0]);
                    }
                  }}
                />
                <DriveFolderUploadIcon
                  sx={{
                    position: 'absolute',
                    top: '41%',
                    left: '41%',
                    fontSize: '60px',
                    zIndex: 1,
                  }}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ padding: '10px', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {images.map((image, index) => (
              <InputFile
                onClick={() => {
                  setImages(images.filter((_, i) => i !== index));
                }}
                file={image}
                imageView
                sx={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: '1px solid #919eabcc',
                }}
              />
            ))}

            <Box
              sx={{
                position: 'relative',
                width: '100px',
                height: '100px',
                borderRadius: '10px',
                border: '1px solid #919eabcc',
              }}
            >
              <TextField
                type="file"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 2,
                  '& input': {
                    width: '100px',
                    height: '100px',
                    padding: 0,
                    opacity: 0,
                    cursor: 'pointer',
                  },
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files) {
                    setImages([...images, ...Array.from(event.target.files)]);
                  }
                }}
              />
              <DriveFolderUploadIcon
                sx={{
                  position: 'absolute',
                  top: '35%',
                  left: '35%',
                  fontSize: '32px',
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: 1,
          padding: '15px',
          backgroundColor: '#fff',
          marginTop: '20px',
          borderRadius: '10px',
        }}
      >
        <Button
          sx={{ height: '40px', width: '80px' }}
          onClick={() => {
            setisOpenDialogCancel(true);
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
            setisOpenDialogCreate(true);
          }}
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          size="small"
        >
          Thêm mới
        </Button>
      </Box>

      <AlertDialog
        isOpen={isOpenDialogCancel}
        labelAgree="Xác nhận"
        labelDisagree="Hủy"
        handleAgree={handleAgreeCancel}
        handleDisagree={handleDisagree}
        description="Hủy thao tác ?"
        title="Xác nhận"
      />
      <AlertDialog
        isOpen={isOpenDialogCreate}
        labelAgree="Xác nhận"
        labelDisagree="Hủy"
        handleAgree={handleAgreeCreate}
        handleDisagree={handleDisagree}
        description="Xác nhận thêm mới sản phẩm ?"
        title="Thêm sản phẩm"
      />
      {loading ? <SplashScreen sx={{ position: 'fixed', opacity: 0.5 }} /> : null}
    </Container>
  );
}
