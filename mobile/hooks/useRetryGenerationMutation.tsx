import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

/**
 * useRetryGenerateMutation : used to generate an item (again).
 * @returns generateMutation
 */
export default function useRetryGenerateMutation() {
    const queryClient = useQueryClient()

    const retryGenerateMutation = useMutation({
        mutationFn: (id:number) => {
            return AkioServices.retryTask(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'my-tasks' })
        },
    })

    return retryGenerateMutation;
  }