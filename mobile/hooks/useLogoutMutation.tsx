import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';

export default function useLogoutMutation() {
    const authContext = useContext(AuthContext);

    const logoutMutation = useMutation({
        mutationFn: () => {
            return AuthServices.logout();
        },
        onSuccess: () => {
            authContext.setIsAuth(false);
            authContext.setIsAdmin('');
            authContext.setUserEmail('');
        },
    })

    return logoutMutation;
  }