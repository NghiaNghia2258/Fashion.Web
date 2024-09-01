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
import { useEffect, useState } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SendIcon from '@mui/icons-material/Send';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { InputFile } from 'src/components/file-thumbnail';
// ----------------------------------------------------------------------

export default function CreateProductView() {
  const settings = useSettingsContext();

  const [sizes, setsizes] = useState<string[]>([]);
  const [colors, setcolors] = useState<string[]>([]);
  const [price, setprice] = useState<number>(0);
  const [inventory, setinventory] = useState<number>(0);

  const [images, setImages] = useState<File[]>([]);

  const [details, setdetails] = useState<any[]>([]);

  const columns: GridColDef[] = [
    {
      field: 'size',
      headerName: 'Size',
    },
    {
      field: 'color',
      headerName: 'Color',
    },
    {
      field: 'price',
      headerName: 'Giá bán',
    },
    {
      field: 'inventory',
      headerName: 'Tồn kho',
    },
  ];

  useEffect(() => {
    let newDetails = [];
    let id = 1;
    if (colors.length == 0) {
      for (let j = 0; j < sizes.length; j++) {
        newDetails.push({
          id: id++,
          size: sizes[j],
          color: '',
          price: 0,
          inventory: 0,
        });
      }
    } else if (sizes.length == 0) {
      for (let j = 0; j < colors.length; j++) {
        newDetails.push({
          id: id++,
          size: '',
          color: colors[j],
          price: 0,
          inventory: 0,
        });
      }
    } else {
      for (let i = 0; i < sizes.length; i++) {
        for (let j = 0; j < colors.length; j++) {
          newDetails.push({
            id: id++,
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
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}
        >
          <Button
            sx={{ height: '40px' }}
            onClick={() => {}}
            variant="contained"
            color="success"
            startIcon={<FileUploadIcon />}
            size="small"
          >
            Import Excel
          </Button>
          <Button
            sx={{ height: '40px' }}
            onClick={() => {}}
            variant="contained"
            color="success"
            startIcon={<FileDownloadIcon />}
            size="small"
          >
            Export Excel
          </Button>
        </Box>
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
                  Tên sản phẩm
                </Typography>
                <TextField
                  label="Nhập tên sản phẩm"
                  sx={{ width: '100%' }}
                  onChange={(event) => {
                    // setOptionPagination({
                    //   ...optionPagination,
                    //   name: event.target.value,
                    // });
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
                    value={''}
                    onChange={(event: SelectChangeEvent) => {
                      // setOptionPagination({
                      //   ...optionPagination,
                      //   categoryId: event.target.value,
                      // });
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
                Loại sản phẩm
              </Typography>
              <TextField label="Mô tả" multiline rows={12} fullWidth />
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
                          event.target.value = null;
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
                          event.target.value = null;
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
                      setprice(parseInt(event.target.value, 0));
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
                      setinventory(parseInt(event.target.value, 0));
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
                }}
              >
                <DataGrid
                  rows={details}
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
            Hình ảnh sản phẩm
          </Typography>
          <Box sx={{ padding: '10px', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {images.map((image) => {
              return (
                <InputFile
                  file={image}
                  imageView={true}
                  sx={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: '1px solid #919eabcc',
                  }}
                />
              );
            })}

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
          onClick={() => {}}
          variant="contained"
          color="error"
          startIcon={<BackspaceIcon />}
          size="small"
        >
          Hủy
        </Button>
        <Button
          sx={{ height: '40px' }}
          onClick={() => {}}
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          size="small"
        >
          Thêm mới
        </Button>
      </Box>
    </Container>
  );
}
