import { Text, View, Image } from 'react-native';
import PostInteraction from '../post/PostInteraction';
import Media from '../post/Media';

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
    keyToInvalidate: string;
}

export default function Post(props: PostProps) {
    const image = props.media_url ? <Media media_url={props.media_url} /> : null;
    
    return (
        <View className='bg-secondary dark:bg-secondaryDark rounded-lg mt-2 mx-2'>
            <View className='p-2'>
                <Text className='font-bold text-lg dark:text-white'>{props.title}</Text>
                <Text className='dark:text-white'>{props.text_content}</Text>
            </View>
            {image}
            <PostInteraction {...props} keyToInvalidate={props.keyToInvalidate} />
        </View>
    );
}