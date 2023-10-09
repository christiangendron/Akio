import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface DeleteCommentMutation {
    comment_id: number;
}

export default function useDeleteCommentMutation() {
    const queryClient = useQueryClient()

    const deleteCommentMutation = useMutation({
            mutationFn: (variables : DeleteCommentMutation) => {
                return AkioServices.deleteComment(variables.comment_id);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['comments'] })
            }
        })

        return deleteCommentMutation;
  }