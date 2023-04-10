import axios, { AxiosInstance } from 'axios';
import TokenServices from './TokenServices';

const baseURL = 'https://oauth.reddit.com';

const AxiosClient: AxiosInstance = axios.create({
  baseURL,
});

AxiosClient.interceptors.request.use(async (config) => {
  let token = await TokenServices.getToken();

  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

AxiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // call refreshToken to get a new access token
      const res = await TokenServices.requestBasicToken();

      // update the Authorization header with the new access token
      originalRequest.headers.Authorization = `Bearer ${res.access_token}`;

      // retry the original request with the updated headers
      return AxiosClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default AxiosClient;