import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import useGenerateUserMutation from '../../hooks/useGenerateUserMutation';
import ErrorMessage from '../ErrorMessage';

export default function GenerateUser() {
    const mutation = useGenerateUserMutation();

    if (mutation.isLoading) return (
        <View className='flex flex-row bg-gray-200 p-3 justify-between rounded-lg m-1'>
            <ActivityIndicator />
        </View>
    )

    if (mutation.error) return (
        <View className='flex flex-row bg-gray-200 p-3 justify-between rounded-lg m-1'>
            <ErrorMessage message="The generation failed." actionMessage="Try again" action={() => mutation.mutate()} />
        </View>
    )
    
    return (
        <TouchableOpacity onPress={() => mutation.mutate()} className='flex flex-row bg-gray-200 p-3 justify-between rounded-lg m-1'>
            <Text className='text-lg'>Generate a user</Text>
        </TouchableOpacity>
    );
}