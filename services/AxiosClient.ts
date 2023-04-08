import axios, { AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseURL = 'https://oauth.reddit.com';

const AxiosClient: AxiosInstance = axios.create({
  baseURL,
});

AxiosClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');

  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return config;
});

export default AxiosClient;