import { Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
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
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center rounded-l-lg mt-2 p-5'>
            <FontAwesome5 name="trash-alt" size={40} color="white" />
    </TouchableOpacity>);};

    const content = <View className="bg-secondary dark:bg-secondaryDark p-2 rounded-lg mt-2 mx-2">
            <Text className='dark:text-white'>{props.text_content}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Overview', { name: props.username, id: props.user_id })}>
                <Text className='text-sm dark:text-white dark:font-bold'>
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