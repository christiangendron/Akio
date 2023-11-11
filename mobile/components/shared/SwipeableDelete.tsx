import {  View, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useDeleteItemMutation from '../../hooks/useDeleteItem';
import { FontAwesome5 } from '@expo/vector-icons'; 

type SwipeableDeleteProps = {
    id: number;
    type: string;
    user_id: number;
    keyToInvalidate: string;
    component: JSX.Element;
}

export default function SwipeableDelete(props: SwipeableDeleteProps) {
    const authContext = useContext(AuthContext);
    const deleteMutation = useDeleteItemMutation(props.keyToInvalidate);

    const deletePost = () => {
        deleteMutation.mutate({ id: props.id, type: props.type});
    };

    const renderRightActions = () => {
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center rounded-l-lg mt-2 p-5'>
            <FontAwesome5 name="trash-alt" size={50} color="white" /> 
    </TouchableOpacity>);};

    
    if (authContext.canDelete(props.user_id)) return (
        <Swipeable renderRightActions={renderRightActions}>
            {props.component}
        </Swipeable>
    );
    
    return (
        <View>
            {props.component}
        </View>
    );
}