import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {BACKEND_URL} from '@env';

function AxiosClient() {
  const client = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    },
  });

  client.interceptors.request.use(
          async (req) => {
              const token = await SecureStore.getItemAsync('secret_token');

              req.headers = req.headers ?? {};
              req.headers['Authorization'] = !!token ? `Bearer ${token}` : undefined;

              return req;
          },
          (err) => Promise.reject(err)
  );

  return client;
}

export default AxiosClient();