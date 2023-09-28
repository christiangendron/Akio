import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import useGenerateCommunityMutations from '../../hooks/useGenerateCommunityMutations';

export default function GenerateCommunity() {
    const mutation = useGenerateCommunityMutations();

    if (mutation.isLoading) return (
        <View className='bg-gray-300 p-5'>
            <ActivityIndicator />
        </View>
    )

    return (
        <TouchableOpacity onPress={() => mutation.mutate()} className='bg-gray-300 p-5'>
            <Text className='text-center'>Generate a new community</Text>
        </TouchableOpacity>
    );
}