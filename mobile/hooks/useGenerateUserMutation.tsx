import { useMutation } from "react-query";
import AkioServices from '../services/AkioServices';

export default function useGenerateUserMutation() {
    const commentMutation = useMutation({
        mutationFn: () => {
            return AkioServices.generateUser();
        }})

        return commentMutation;
  }