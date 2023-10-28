import { Text, View, Image } from 'react-native';
import PostInteraction from '../PostInteraction';
import Media from '../Media';

export interface PostProps {
    id: number;
    title: string;
    text_content: string;
    votes: number;
    media_url: string;
    community_id: number;
    user_id: number;
    community_name: string;
    username: string;
}

export default function Post(props: PostProps) {
    const image = props.media_url ? <Media media_url={props.media_url} /> : null;
    
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