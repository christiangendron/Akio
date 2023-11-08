import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import ErrorMessage from './ErrorMessage';
import { useEffect } from 'react';
import useGenerateMutation from '../hooks/useGenerateMutation';

type GenerateCommentProps = {
    id: number;
    type: string;
    inspiration?: string;
    with_image?: boolean;
    keyToInvalidate: string;
    onComplete: () => void;
}

export type GenerateItemVariables = {
    id: number;
    type: string;
    inspiration?: string;
    with_image?: boolean;
}

export default function GenerateButton(props: GenerateCommentProps) {
    const mutation = useGenerateMutation(props.keyToInvalidate);

    const variables = {
        id: props.id,
        type: props.type,
        inspiration: props.inspiration,
        with_image: props.with_image,
    };

    useEffect(() => {
      if (mutation.isSuccess) {
        props.onComplete();
      }
    }, [mutation])
    
    if (mutation.isLoading) return (
        <View className='bg-black p-5'>
            <ActivityIndicator />
        </View>
    )

    if (mutation.error instanceof Error) {
        const errorMessage = (mutation.error as any).response?.data?.message;

        return (
            <View className='bg-black p-5'>
                <ErrorMessage message={errorMessage} actionMessage="Try again" action={() => mutation.mutate(variables)} />
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={() => mutation.mutate(variables)} className='bg-black p-5'>
            <Text className='text-center text-white'>Generate</Text>
        </TouchableOpacity>
    );
}