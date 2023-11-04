import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import useGeneratePostMutations from '../../hooks/useGeneratePostMutations';
import ErrorMessage from '../ErrorMessage';

interface GeneratePostProps {
    community_id: number;
}

export default function GeneratePost(props: GeneratePostProps) {
    const mutation = useGeneratePostMutations();

    const variables = {
        community_id: props.community_id,
    };
    
    if (mutation.isLoading) return (
        <View className='bg-gray-300 p-5'>
            <ActivityIndicator />
        </View>
    )

    if (mutation.error) return (
        <View className='bg-gray-300 p-5'>
            <ErrorMessage message="The generation failed." actionMessage="Try again" action={() => mutation.mutate(variables)} />
        </View>
    )
    
    return (
        <TouchableOpacity onPress={() => mutation.mutate(variables)} className='bg-gray-300 p-5'>
            <Text className='text-center'>Generate a post</Text>
        </TouchableOpacity>
    );
}