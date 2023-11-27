import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';
import { GenerateVariables } from "../components/modal/GenerateModal";

/**
 * useGenerateMutation : used to generate an item.
 * @param queryKeyToInvalidate string
 * @returns generateMutation
 */
export default function useGenerateMutation(queryKeyToInvalidate: string) {
    const queryClient = useQueryClient()

    const generateMutation = useMutation({
        mutationFn: (variables : GenerateVariables) => {
            return AkioServices.generateItem(variables);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'my-tasks' })
            //queryClient.invalidateQueries({ queryKey: [queryKeyToInvalidate] })
        },
    })

    return generateMutation;
  }