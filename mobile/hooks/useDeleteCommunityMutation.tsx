import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface DeleteCommunityMutation {
    community_id: number;
}

export default function useDeleteCommunityMutation() {
    const queryClient = useQueryClient()

    const deleteCommunityMutation = useMutation({
            mutationFn: (variables : DeleteCommunityMutation) => {
                return AkioServices.deleteCommunity(variables.community_id);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['community-list'] })
            },
        })

        return deleteCommunityMutation;
  }