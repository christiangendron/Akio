import { Text, View, Image } from 'react-native';
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
    const backendUrl = process.env.BACKEND_IMAGE_URL;
    const image = props.media_url ? <Image source={{ uri: backendUrl + props.media_url }} className='h-96 bg-gray-400 mb-2' /> : null;
    
    return (
        <View className='bg-white'>
            <View className='p-2'>
                <Text className='font-bold text-lg'>{props.title}</Text>
                <Text>{props.text_content}</Text>
            </View>
            {image}
            <PostInteraction {...props} />
        </View>
    );
}