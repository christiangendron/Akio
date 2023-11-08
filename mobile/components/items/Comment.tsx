import { Text, View, TouchableOpacity, Image } from 'react-native';
const trashCan = require('../../assets/icons/trash-can.png');
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import useDeleteItemMutation from '../../hooks/useDeleteItem';

export interface CommentItemProps {
    id: number;
    text_content: string;
    votes: number;
    user_id: number;
    post_id: number;
    username: string;
    keyToInvalidate: string;
}

export default function Comment(props: CommentItemProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const deleteCommentMutation = useDeleteItemMutation(props.keyToInvalidate);
    const authContext = useContext(AuthContext);

    const deletePost = () => {
        deleteCommentMutation.mutate({ id: props.id, type: 'comment' })
    };
    
    const renderRightActions = () => {
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center'>
            <Image source={trashCan} className='h-5 w-5 m-5' />
    </TouchableOpacity>);};

    const content = <View className="bg-white p-2 w-screen">
            <Text>{props.text_content}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Overview', { name: props.username, id: props.user_id })}>
                <Text className='text-sm text-gray-500'>
                    by {props.username}
                </Text>
            </TouchableOpacity> 
        </View>

    if (authContext.canDelete(props.user_id)) return (
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