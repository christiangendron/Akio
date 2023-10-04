import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface PostMutation {
    community_id: number;
    community_name: string;
}

export default function usePostMutations() {
    const queryClient = useQueryClient()

    const postsMutations = useMutation({
        mutationFn: (variables : PostMutation) => {
            return AkioServices.generatePost(variables.community_id, variables.community_name);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
          },
    })

    return postsMutations;
  }