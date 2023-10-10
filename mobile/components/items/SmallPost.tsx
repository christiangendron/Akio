import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import PostInteraction from '../PostInteraction';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import useDeletePostMutation from '../../hooks/useDeletePostMutation';
import Media from '../Media';
const trashCan = require('../../assets/icons/trash-can.png');

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
    
    const deleteMutation = useDeletePostMutation();

    const deletePost = () => {
        deleteMutation.mutate({ post_id: props.id });
    };

    const renderRightActions = () => {
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center'>
            <Image source={trashCan} className='h-10 w-10 m-5' />
    </TouchableOpacity>);};

    const image = props.media_url ? <Media media_url={props.media_url} /> : null;

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View className='bg-white'>
                <TouchableOpacity onPress={() => navigation.push('Details', { ...props })} className='p-2'>
                    <Text className='font-bold text-lg'>{props.title}</Text>
                    <Text>{props.text_content.slice(0,200)}...</Text>
                </TouchableOpacity>
                {image}
                <PostInteraction {...props} />
            </View>
        </Swipeable>
    );
}