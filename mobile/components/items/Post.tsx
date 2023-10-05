import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import PostInteraction from '../PostInteraction';

export interface PostProps {
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

export default function Post(props: PostProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <View className='bg-white px-2 gap-2'>
            <View>
                <Text className='font-bold text-lg'>{props.title}</Text> 
            </View>
            <View>
                <Text>{props.text_content}</Text>
                {props.media_url ? <Image source={{ uri: props.media_url }} className='w-auto h-96 my-1 bg-gray-400 -mx-2' /> : null}
            </View>
            <PostInteraction {...props} />
        </View>
    );
}