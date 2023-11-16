import {  View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useContext, useEffect, useState } from 'react';
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
    const [deleted, setDeleted] = useState(false);
    
    const deletePost = () => {
        deleteMutation.mutate({ id: props.id, type: props.type});
    };

    useEffect(() => {
        if (deleteMutation.isSuccess) {
            setDeleted(true);
        } 
    }, [deleteMutation.isSuccess]);

    const renderRightActions = () => {
    return (<TouchableOpacity onPress={deletePost} className='bg-red-500 justify-center rounded-l-lg mt-2 p-5' disabled={deleteMutation.isLoading}>
            {deleteMutation.isLoading ? <ActivityIndicator color='#ffffff' /> : <FontAwesome5 name="trash" size={24} color="white" />}
    </TouchableOpacity>);};

    if (authContext.canDelete(props.user_id)) return (
        <Swipeable renderRightActions={renderRightActions}>
            {deleted ? null :props.component}
        </Swipeable>
    );
    
    return (
        <View>
            {props.component}
        </View>
    );
}