import AxiosClient from './AxiosClient';
import * as SecureStore from 'expo-secure-store';

async function login(email: string, password: string) {
    const res = await AxiosClient.post('auth/login', {'email': email, 'password': password});
    await setToken(res.data.data.token);
    return res;
}

async function register(username: string, email: string, password: string) {
    const res = await AxiosClient.post('auth/register', {'email': email, 'username': username, 'password': password});
    await setToken(res.data.data.token);
    return res;
}

async function logout() {
    AxiosClient.post('auth/logout');
    await clearToken();
}

async function setToken(token: string) {
    AxiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    await SecureStore.setItemAsync('secret_token', token);
}

async function clearToken() {
    delete AxiosClient.defaults.headers.common['Authorization'];
    await SecureStore.setItemAsync('secret_token', '');
}

const AuthServices = {
    login,
    register,
    logout,
    setToken,
};

export default AuthServices;