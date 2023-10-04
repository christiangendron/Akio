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

    return (
        <View className='bg-white px-2 gap-2'>
            <TouchableOpacity onPress={() => navigation.push('Details', { ...props })}>
                    <Text className='font-bold text-lg'>{props.title}</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push('Details', { ...props })}>
                <Text>{props.text_content.slice(0,200)}...</Text>
                {props.media_url ? <Image source={{ uri: props.media_url }} className='w-auto h-96 my-1 bg-gray-400 -mx-2' /> : null}
            </TouchableOpacity>
            <PostInteraction {...props} />
        </View>
    );
}