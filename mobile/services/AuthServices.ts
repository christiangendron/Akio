import AxiosClient from './AxiosClient';

export type UserInfo = {
    token: string;
    user: {
        email: string;
        username: string;
        id: number;
        is_admin: boolean;
        avatar: string;
    }
}

async function login(email: string, password: string) {
    const res = await AxiosClient.post('auth/login', {'email': email, 'password': password});
    return res;
}

async function register(username: string, email: string, password: string) {
    const res = await AxiosClient.post('auth/register', {'email': email, 'username': username, 'password': password});
    return res;
}

async function logout() {
    await AxiosClient.post('auth/logout');
}

const AuthServices = {
    login,
    register,
    logout,
};

export default AuthServices;