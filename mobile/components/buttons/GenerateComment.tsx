import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import useGenerateCommentMutations from '../../hooks/useGenerateCommentMutations';
import ErrorMessage from '../ErrorMessage';

interface GenerateCommentProps {
    post_id: number;
}

export default function GenerateComment(props: GenerateCommentProps) {
    const mutation = useGenerateCommentMutations();

    const variables = {
        post_id: props.post_id
    };
    
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
            <Text className='text-center'>Generate a comment</Text>
        </TouchableOpacity>
    );
}