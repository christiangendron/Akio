import { useMutation } from "react-query";
import AuthServices, { AuthResponce } from "../services/AuthServices";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

interface LoginMutation {
    email: string;
    password: string;
}

/**
 * useLoginMutation : used to login a user.
 * @returns loginMutation
 */
export default function useLoginMutation() {
    const authContext = useContext(AuthContext);

    const loginMutation = useMutation({
        mutationFn: (data : LoginMutation) => {
            return AuthServices.login(data.email, data.password);
        },
        onSuccess: async (res: AuthResponce) => {
            authContext.onLogging(res.user);
            await SecureStore.setItemAsync('user_info', JSON.stringify(res.user));
            await SecureStore.setItemAsync('secret_token', res.token);
        },
    })

    return loginMutation;
  }