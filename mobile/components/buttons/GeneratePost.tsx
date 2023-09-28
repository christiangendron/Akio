import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import useGeneratePostMutations from '../../hooks/useGeneratePostMutations';

interface GeneratePostProps {
    community_id: number;
    community_name: string;
}

export default function GeneratePost(props: GeneratePostProps) {
    const mutation = useGeneratePostMutations();

    const variables = {
        community_id: props.community_id,
        community_name: props.community_name,
        user_id: 1,
    };
    
    if (mutation.isLoading) return (
        <View className='bg-gray-300 p-5'>
            <ActivityIndicator />
        </View>
    )

    return (
        <TouchableOpacity onPress={() => mutation.mutate(variables)} className='bg-gray-300 p-5'>
            <Text className='text-center'>Generate a post</Text>
        </TouchableOpacity>
    );
}