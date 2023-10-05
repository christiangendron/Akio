import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import PostInteraction from '../PostInteraction';

export interface SmallPostProps {
    author: string;
    id: number;
    title: string;
    text_content: string;
    votes: number;
    media_url: string;
    community_id: number;
    user_id: number;
    name: string;
    username: string;
}

export default function SmallPost(props: SmallPostProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const image = props.media_url ? <Image source={{ uri: props.media_url }} className='h-96 bg-gray-400 mb-2' /> : null;
        
    return (
        <View className='bg-white'>
            <TouchableOpacity onPress={() => navigation.push('Details', { ...props })} className='p-2'>
                <Text className='font-bold text-lg'>{props.title}</Text>
                <Text>{props.text_content}</Text>
            </TouchableOpacity>
            {image}
            <PostInteraction {...props} />
        </View>
    );
}