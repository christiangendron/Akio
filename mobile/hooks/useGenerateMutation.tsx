import { useMutation, useQueryClient } from "react-query";
import AkioServices from '../services/AkioServices';
import { GenerateVariables } from "../components/modal/GenerateModal";

/**
 * useGenerateMutation : used to generate an item.
 * @returns generateMutation
 */
export default function useGenerateMutation() {
    const queryClient = useQueryClient()

    const generateMutation = useMutation({
        mutationFn: (variables : GenerateVariables) => {
            return AkioServices.newTask(variables);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'my-tasks' })
        },
    })

    return generateMutation;
  }