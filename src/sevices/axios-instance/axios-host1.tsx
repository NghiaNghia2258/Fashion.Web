import axios from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const GET = async (path: string, options?: any): Promise<any> => {
  const res = await axiosInstance.get(path, options);
  return res.data;
};

export const POST = async (path: string, data?: any, headers?: any): Promise<any> => {
  try {
    const res = await axiosInstance.post(path, data, headers);
    return res.data;
  } catch (error) {
    return {
      isSucceeded: false,
      statusCode: error.response.data.StatusCode,
      message: error.response.data.Message,
    };
  }
};

export const PUT = async (path: string, data?: any): Promise<any> => {
  try {
    const res = await axiosInstance.put(path, data);
    return res.data;
  } catch (error) {
    return {
      isSucceeded: false,
      statusCode: error.response.data.StatusCode,
      message: error.response.data.Message,
    };
  }
};

export const DELETE = async (path: string, options?: any): Promise<any> => {
  try {
    const res = await axiosInstance.delete(path, options);
    return res.data;
  } catch (error) {
    return {
      isSucceeded: false,
      statusCode: error.response.data.StatusCode,
      message: error.response.data.Message,
    };
  }
};
export default axiosInstance;
