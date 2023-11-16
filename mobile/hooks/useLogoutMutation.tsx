import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

export default function useLogoutMutation() {
    const authContext = useContext(AuthContext);

    const logoutMutation = useMutation({
        mutationFn: async () => {
            authContext.onLogout();
            return AuthServices.logout();
        },
        onSettled: async () => {
            await SecureStore.deleteItemAsync('user_info');
            await SecureStore.deleteItemAsync('secret_token');
        },
    })

    return logoutMutation;
  }