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

export type AuthResponce = {
    user: UserInfo;
    token: string;
}

/**
 * Route to login.
 * @param email email of the user
 * @param password password of the user
 * @returns AuthResponce
 */
async function login(email: string, password: string): Promise<AuthResponce> {
    const res = await AxiosClient.post('auth/login', {'email': email, 'password': password});
    return res.data.data;
}

/**
 * Route to register.
 * @param username username of the user
 * @param email email of the user
 * @param password password of the user
 * @returns AuthResponce
 */
async function register(username: string, email: string, password: string): Promise<AuthResponce> {
    const res = await AxiosClient.post('auth/register', {'email': email, 'username': username, 'password': password});
    return res.data.data;
}

/**
 * Route to logout.
 * @returns _
*/
async function logout() {
    await AxiosClient.post('auth/logout');
}

const AuthServices = {
    login,
    register,
    logout,
};

export default AuthServices;