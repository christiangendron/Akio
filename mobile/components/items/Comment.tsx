import { Text, View, TouchableOpacity, Image } from 'react-native';
import useDeleteCommentMutation from '../../hooks/useDeleteCommentMutation';
const trashCan = require('../../assets/icons/trash-can.png');
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

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
    const authContext = useContext(AuthContext);

    const deletePost = () => {
        deleteCommentMutation.mutate({ comment_id: props.id })
    };
    
    const renderRightActions = () => {
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center'>
            <Image source={trashCan} className='h-5 w-5 m-5' />
    </TouchableOpacity>);};

    const content = <View className="bg-white p-2 w-screen">
            <Text>{props.text_content}</Text>
            <Text className='text-sm text-gray-500'>
                by {props.username}
            </Text>
        </View>

    if (props.user_id === authContext.userId || authContext.isAdmin) return (
        <Swipeable renderRightActions={renderRightActions}>
            {content}
        </Swipeable>
    );

    return (
        <View>
            {content}
        </View>
    );
}