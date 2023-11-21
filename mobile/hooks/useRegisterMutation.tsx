import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

interface RegisterMutation {
    username: string;
    email: string;
    password: string;
}

/**
 * useRegisterMutation : used to register a user.
 * @returns registerMutation
 */
export default function useRegisterMutation() {
    const authContext = useContext(AuthContext);

    const registerMutation = useMutation({
        mutationFn: (data : RegisterMutation) => {
            return AuthServices.register(data.username, data.email, data.password);
        },
        onSuccess: async (res) => {
            authContext.onLogging(res.data.data.user);
            await SecureStore.setItemAsync('user_info', JSON.stringify(res.data.data.user));
            await SecureStore.setItemAsync('secret_token', res.data.data.token);
        },
    })

    return registerMutation;
  }