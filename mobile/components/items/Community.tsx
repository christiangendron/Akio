import { Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import useDeleteCommunityMutation from '../../hooks/useDeleteCommunityMutation';
const trashCan = require('../../assets/icons/trash-can.png');

export interface CommunityProps {
    id: number;
    name: string;
    description: string;
}

export default function Community(props: CommunityProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const deleteMutation = useDeleteCommunityMutation();

    const deletePost = () => {
        deleteMutation.mutate({ community_id: props.id })
    };
    
    const renderRightActions = () => {
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center'>
            <Image source={trashCan} className='h-10 w-10 m-5' />
    </TouchableOpacity>);};

    const community_name = props.name.charAt(0).toUpperCase() + props.name.slice(1);

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity onPress={() => navigation.push('Community', { name: props.name, id: props.id })} className='flex bg-white p-2 justify-between'>
                <Text className='text-lg font-bold'>{community_name}</Text>
                <Text className='text-sm'>{props.description}</Text>
            </TouchableOpacity>
        </Swipeable>
    );
}