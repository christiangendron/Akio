import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface DeletePostMutation {
    post_id: number;
}

export default function useDeletePostMutation() {
    const queryClient = useQueryClient()

    const deletePostMutation = useMutation({
            mutationFn: (variables : DeletePostMutation) => {
                return AkioServices.deletePost(variables.post_id);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            },
        })

        return deletePostMutation;
  }