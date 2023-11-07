import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import ErrorMessage from './ErrorMessage';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import AkioServices from '../services/AkioServices';

type GenerateCommentProps = {
    id: number;
    type: string;
    inspiration?: string;
    keyToInvalidate: string;
    onComplete: () => void;
}

export type GenerateItemVariables = {
    id: number;
    type: string;
    inspiration?: string;
}

export default function GenerateButton(props: GenerateCommentProps) {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (variables : GenerateItemVariables) => {
            return AkioServices.generateItem(variables);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [props.keyToInvalidate] })
        },
    })

    const variables = {
        id: props.id,
        type: props.type,
        inspiration: props.inspiration
    };

    useEffect(() => {
      if (mutation.isSuccess) {
        props.onComplete();
      }
    }, [mutation])
    
    if (mutation.isLoading) return (
        <View className='bg-gray-300 p-5'>
            <ActivityIndicator />
        </View>
    )

    if (mutation.error instanceof Error) return (
        <View className='bg-gray-300 p-5'>
            <ErrorMessage message={mutation.error.message} actionMessage="Try again" action={() => mutation.mutate(variables)} />
        </View>
    )

    return (
        <TouchableOpacity onPress={() => mutation.mutate(variables)} className='bg-gray-300 p-5'>
            <Text className='text-center'>Generate</Text>
        </TouchableOpacity>
    );
}