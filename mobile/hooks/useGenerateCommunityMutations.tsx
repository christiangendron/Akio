import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

export default function useGenerateCommunityMutations() {
    const queryClient = useQueryClient()

    const communityMutations = useMutation({
        mutationFn: () => {
            return AkioServices.generateCommunity();
        },
        onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['community-list'] })
            },
        })

        return communityMutations;
  }