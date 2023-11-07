import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface DeleteItemMutation {
    id: number;
    type: string;
}

export default function useDeleteItemMutation(queryKeyToInvalidate: string) {
    const queryClient = useQueryClient()

    const deleteItemMutation = useMutation({
        mutationFn: (variables : DeleteItemMutation) => {
            return AkioServices.deleteItem(variables);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyToInvalidate] })
        },
    })

    return deleteItemMutation;
  }