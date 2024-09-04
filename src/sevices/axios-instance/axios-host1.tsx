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

export const get = async (path: string, options?: any): Promise<any> => {
  const res = await axiosInstance.get(path, options);
  return res.data;
};

export const post = async (path: string, data?: any): Promise<any> => {
  try {
    const res = await axiosInstance.post(path, data);
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
