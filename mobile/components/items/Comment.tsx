import { Text, View, TouchableOpacity, Image } from 'react-native';
import useDeleteCommentMutation from '../../hooks/useDeleteCommentMutation';
const trashCan = require('../../assets/icons/trash-can.png');
import Swipeable from 'react-native-gesture-handler/Swipeable';

export interface CommentItemProps {
    id: number;
    text_content: string;
    votes: number;
    user_id: number;
    post_id: number;
    username: string;
}

export default function Comment(props: CommentItemProps) {
    const deleteCommentMutation = useDeleteCommentMutation();

    const deletePost = () => {
        deleteCommentMutation.mutate({ comment_id: props.id })
    };
    
    const renderRightActions = () => {
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center'>
            <Image source={trashCan} className='h-5 w-5 m-5' />
    </TouchableOpacity>);};

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View className="bg-white p-2 w-screen">
                <Text>{props.text_content}</Text>
                <Text className='text-sm text-gray-500'>
                    by {props.username} · {props.votes} ↑
                </Text>
            </View>
        </Swipeable>
    );
}