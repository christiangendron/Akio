import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

interface LoginMutation {
    email: string;
    password: string;
}

export default function useLoginMutation() {
    const authContext = useContext(AuthContext);

    const loginMutation = useMutation({
        mutationFn: (data : LoginMutation) => {
            return AuthServices.login(data.email, data.password);
        },
        onSuccess: async (res) => {
            authContext.onLogging(res.data.data.user);
            await SecureStore.setItemAsync('user_info', JSON.stringify(res.data.data.user));
            await SecureStore.setItemAsync('secret_token', res.data.data.token);
        },
    })

    return loginMutation;
  }