import { Text, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useDeleteItemMutation from '../../hooks/useDeleteItem';
import { shortenString } from '../../tools/Formating';
const trashCan = require('../../assets/icons/trash-can.png');

export interface CommunityProps {
    id: number;
    name: string;
    description: string;
    media_url: string;
    user_id: number;
    keyToInvalidate: string;
}

export default function Community(props: CommunityProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const authContext = useContext(AuthContext);
    const backendUrl = process.env.BACKEND_IMAGE_URL;

    const deleteMutation = useDeleteItemMutation(props.keyToInvalidate);

    const deletePost = () => {
        deleteMutation.mutate({ id: props.id, type: "community" })
    };
    
    const renderRightActions = () => {
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center'>
            <Image source={trashCan} className='h-10 w-10 m-5' />
    </TouchableOpacity>);};

    const community_name = props.name.charAt(0).toUpperCase() + props.name.slice(1);

    const image = props.media_url ? 
    <Image source={{ uri: backendUrl + props.media_url }} className='h-16 w-16 rounded-full overflow-hidden m-2 border border-1' /> : 
    <Image source={require('../../assets/images/default-community.png')} className='h-16 w-16 rounded-full overflow-hidden m-2 border border-1' />

    const content = <TouchableOpacity onPress={() => navigation.push('Community', { name: props.name, id: props.id })} className='flex flex-row bg-white justify-between items-center'>
        {image}
        <View className='flex flex-col w-4/5 pr-3 pb-1'>
            <Text className='text-lg font-bold'>{community_name}</Text>
            <Text className='text-sm'>{shortenString(props.description, 125)}</Text>
        </View>
    </TouchableOpacity>

    if (authContext.canDelete(props.user_id)) return (
        <Swipeable renderRightActions={renderRightActions}>
            {content}
        </Swipeable>
    )

    return (
        <View>
            {content}
        </View>
    );
}