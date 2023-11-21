import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface UnSavePostMutation {
    id: number;
}

/**
 * useUnSavePostMutation : used to unsave a post.
 * @param keyToInvalidate string
 * @returns generateMutation
 */
export default function useUnSavePostMutation(keyToInvalidate: string) {
    const queryClient = useQueryClient()

    const generateMutation = useMutation({
        mutationFn: (variables : UnSavePostMutation) => {
            return AkioServices.unSavePost(variables.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [keyToInvalidate] })
            queryClient.invalidateQueries({ queryKey: ['saved-post'] }) // also invalidate saved-post query
        },
    })

    return generateMutation;
  }