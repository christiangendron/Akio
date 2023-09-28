import { Text, View, TouchableOpacity } from 'react-native';
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
            <TouchableOpacity onPress={() => navigation.push('Details', { ...props })}>
                    <Text className='font-bold text-lg'>{props.title}</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push('Details', { ...props })}>
                <Text>{props.text_content}</Text>
            </TouchableOpacity>
            <PostInteraction {...props} />
        </View>
    );
}