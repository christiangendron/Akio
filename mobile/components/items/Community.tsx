import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import { CommunityProps } from '../../types/Community';

export default function Community(props: CommunityProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    const community_name = props.name.charAt(0).toUpperCase() + props.name.slice(1);

    return (
        <TouchableOpacity onPress={() => navigation.push('Community', { name: props.name, id: props.id })} className='flex bg-gray-300 p-3 justify-between rounded-lg m-1'>
            <Text className='text-lg font-bold'>{community_name}</Text>
            <Text className='text-sm'>{props.description}</Text>
        </TouchableOpacity>
    );
}