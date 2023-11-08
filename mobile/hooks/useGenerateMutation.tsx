import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';

interface GenerateItemVariables {
    id: number;
    type: string;
}

export default function useGenerateMutation(queryKeyToInvalidate: string) {
    const queryClient = useQueryClient()

    const generateMutation = useMutation({
        mutationFn: (variables : GenerateItemVariables) => {
            return AkioServices.generateItem(variables);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeyToInvalidate] })
        },
    })

    return generateMutation;
  }