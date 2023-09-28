import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import useGenerateCommentMutations from '../../hooks/useGenerateCommentMutations';

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

    return (
        <TouchableOpacity onPress={() => mutation.mutate(variables)} className='bg-gray-300 p-5'>
            <Text className='text-center'>Generate a comment</Text>
        </TouchableOpacity>
    );
}