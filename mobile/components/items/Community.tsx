import { Text, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import { shortenString } from '../../tools/Formating';

export interface CommunityProps {
    id: number;
    name: string;
    description: string;
    media_url: string;
    user_id: number;
}

export default function Community(props: CommunityProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const backendUrl = process.env.BACKEND_IMAGE_URL;

    const community_name = props.name.charAt(0).toUpperCase() + props.name.slice(1);

    const image = props.media_url ? 
    <Image source={{ uri: backendUrl + 'sm-' + props.media_url }} className='h-16 w-16 rounded-full overflow-hidden m-2 border border-1' /> : 
    <Image source={require('../../assets/images/default-community.png')} className='h-16 w-16 rounded-full overflow-hidden m-2 border border-1' />

    return (
        <TouchableOpacity 
        onPress={() => navigation.push('Community', { name: props.name, id: props.id, type: 'community-posts', withGeneration: true, withSearch: true })} 
        className='flex flex-row bg-secondary dark:bg-secondaryDark rounded-lg mx-2 mt-2 items-center'>
            {image}
            <View className='flex flex-col w-4/5 pr-3 pb-1'>
                <Text className='text-lg font-bold dark:text-white'>{community_name}</Text>
                <Text className='text-sm dark:text-white'>{shortenString(props.description, 125)}</Text>
            </View>
        </TouchableOpacity>
    );
}