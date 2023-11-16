import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface SavePostMutation {
    id: number;
}

export default function useSavePostMutation(keyToInvalidate: string) {
    const queryClient = useQueryClient()

    const generateMutation = useMutation({
        mutationFn: (variables : SavePostMutation) => {
            return AkioServices.savePost(variables.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [keyToInvalidate] })
            queryClient.invalidateQueries({ queryKey: ['saved-post'] })
        },
    })

    return generateMutation;
  }