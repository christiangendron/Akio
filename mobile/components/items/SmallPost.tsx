import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../../types/Navigator';
import PostInteraction from '../post/PostInteraction';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Media from '../post/Media';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useDeleteItemMutation from '../../hooks/useDeleteItem';
import { FontAwesome5 } from '@expo/vector-icons'; 

export interface SmallPostProps {
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

export default function SmallPost(props: SmallPostProps) {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const authContext = useContext(AuthContext);
    const deleteMutation = useDeleteItemMutation(props.keyToInvalidate);

    const deletePost = () => {
        deleteMutation.mutate({ id: props.id, type: 'post'});
    };

    const renderRightActions = () => {
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center rounded-l-lg mt-2 p-5'>
            <FontAwesome5 name="trash-alt" size={50} color="white" /> 
    </TouchableOpacity>);};

    const image = props.media_url ? <Media media_url={props.media_url} /> : null;

    const content = <View className='bg-secondary dark:bg-secondaryDark rounded-lg mx-2 mt-2'>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { ...props })} className='p-2'>
                <Text className='font-bold text-lg dark:text-white'>{props.title}</Text>
                <Text className='dark:text-white'>{props.text_content.slice(0,200)}...</Text>
            </TouchableOpacity>
            {image}
            <PostInteraction {...props} keyToInvalidate={props.keyToInvalidate} />
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