import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface CommentMutation {
    post_id: number;
}

export default function useGenerateCommentMutations() {
    const queryClient = useQueryClient()

    const commentMutation = useMutation({
        mutationFn: (variables : CommentMutation) => {
            return AkioServices.generateComment(variables.post_id);
        },
        onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['comments'] })
            },
        })

        return commentMutation;
  }