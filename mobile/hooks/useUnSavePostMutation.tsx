import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface UnSavePostMutation {
    id: number;
}

export default function useUnSavePostMutation(keyToInvalidate: string) {
    const queryClient = useQueryClient()

    const generateMutation = useMutation({
        mutationFn: (variables : UnSavePostMutation) => {
            return AkioServices.unSavePost(variables.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [keyToInvalidate] })
            queryClient.invalidateQueries({ queryKey: ['saved-post'] })
        },
    })

    return generateMutation;
  }