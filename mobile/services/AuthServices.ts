import AxiosClient from './AxiosClient';
import * as SecureStore from 'expo-secure-store';

async function login(email: string, password: string) {
    const res = await AxiosClient.post('auth/login', {'email': email, 'password': password});
    await userInfo(res.data.data);
    return res;
}

async function register(username: string, email: string, password: string) {
    const res = await AxiosClient.post('auth/register', {'email': email, 'username': username, 'password': password});
    await userInfo(res.data.data);
    return res;
}

async function logout() {
    await AxiosClient.post('auth/logout');
    await clearToken();
}

export type UserInfo = {
    token: string;
    user: {
        email: string;
        username: string;
        id: number;
        is_admin: boolean;
    }
}

async function userInfo(userInfo: UserInfo) {
    AxiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + userInfo.token;
    await SecureStore.setItemAsync('secret_token', userInfo.token);
    await SecureStore.setItemAsync('email', userInfo.user.email);
    await SecureStore.setItemAsync('username', userInfo.user.username);
    await SecureStore.setItemAsync('user_id', userInfo.user.id.toString());
    await SecureStore.setItemAsync('is_admin', userInfo.user.is_admin.toString());
}

async function clearToken() {
    delete AxiosClient.defaults.headers.common['Authorization'];
    await SecureStore.setItemAsync('secret_token', '');
    await SecureStore.setItemAsync('email', '');
    await SecureStore.setItemAsync('username', '');
    await SecureStore.setItemAsync('user_id', '');
    await SecureStore.setItemAsync('is_admin', '');
}

async function getUserInfo() {
    const email = await SecureStore.getItemAsync('email');
    const username = await SecureStore.getItemAsync('username');
    const user_id = await SecureStore.getItemAsync('user_id');
    const is_admin = await SecureStore.getItemAsync('is_admin');
    
    return {
        email: email,
        username: username,
        user_id: user_id,
        is_admin: is_admin,
    }
}

const AuthServices = {
    login,
    register,
    logout,
    userInfo,
    getUserInfo,
};

export default AuthServices;