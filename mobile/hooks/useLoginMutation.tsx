import { useMutation } from "react-query";
import AuthServices from "../services/AuthServices";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';

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
        onSuccess: (res) => {
            authContext.setIsAuth(true);
            authContext.setIsAdmin(res.data.data.user.is_admin);
            authContext.setUserEmail(res.data.data.user.email);
        },
    })

    return loginMutation;
  }