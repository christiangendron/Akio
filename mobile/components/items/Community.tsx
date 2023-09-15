import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import { CommunityProps } from '../../types/Community';

export default function Community(props: CommunityProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <TouchableOpacity onPress={() => navigation.push('Community', { name: props.name, id: props.id })}>
            <View className='flex flex-row bg-slate-300 p-3 justify-between rounded-lg m-1'>
                <Text className='text-center text-lg'>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
}