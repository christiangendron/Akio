import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import useGenerateCommunityMutations from '../../hooks/useGenerateCommunityMutations';
import ErrorMessage from '../ErrorMessage';

export default function GenerateCommunity() {
    const mutation = useGenerateCommunityMutations();

    if (mutation.isLoading) return (
        <View className='bg-gray-300 p-5'>
            <ActivityIndicator />
        </View>
    )

    if (mutation.error) return (
        <View className='bg-gray-300 p-5'>
            <ErrorMessage message="The generation failed." actionMessage="Try again" action={() => mutation.mutate()} />
        </View>
    )

    return (
        <TouchableOpacity onPress={() => mutation.mutate()} className='bg-gray-300 p-5'>
            <Text className='text-center'>Generate a new community</Text>
        </TouchableOpacity>
    );
}