import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {BACKEND_URL} from '@env';

/**
 * Axios client used by the application to make requests to the backend.
 * @returns axios instance
 */
function AxiosClient() {
	const client = axios.create({
		baseURL: BACKEND_URL,
		timeout: 5000,
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Accept': 'application/json',
		},
	});

	// When making a request, intercept the request and the token to it
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