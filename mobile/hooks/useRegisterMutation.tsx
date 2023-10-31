import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';

interface LoginMutation {
    username: string;
    email: string;
    password: string;
}

export default function useRegisterMutation() {
    const authContext = useContext(AuthContext);

    const registerMutation = useMutation({
        mutationFn: (data : LoginMutation) => {
            return AuthServices.register(data.username, data.email, data.password);
        },
        onSuccess: (res) => {
            authContext.setIsAuth(true);
            authContext.setIsAdmin(res.data.data.user.is_admin);
            authContext.setUserEmail(res.data.data.user.email);
        },
    })

    return registerMutation;
  }