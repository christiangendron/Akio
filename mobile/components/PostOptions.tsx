import { useState } from "react";
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, Text } from "react-native";
import Option from "./items/Option";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { StackParams } from "../types/Navigator";
import useDeletePostMutation from "../hooks/useDeletePostMutation";

interface PostOptionsProps {
    id: number;
    username: string;
    user_id: number;
    community: string;
    community_id: number;
}

export default function PostOptions(props: PostOptionsProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    const deleteMutation = useDeletePostMutation();

    const modal = 
        <View className="flex flex-1">
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View className="flex flex-1 justify-end items-center" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <View className="bg-gray-300 w-full p-1 flex items-center pb-10 rounded-lg">
                        <Option label={`${props.community}`} handler={() => {
                        setModalVisible(!modalVisible);
                        navigation.push('Community', { id: props.community_id, name: props.community })
                        }} />
                        <Option label={props.username} handler={() => {
                        setModalVisible(!modalVisible);
                        navigation.navigate('Overview', { id: props.user_id, name: props.username })
                        }} />
                        <Option label="Delete" handler={() => {
                            deleteMutation.mutate({ post_id: props.id });
                        setModalVisible(!modalVisible);
                        }} />
                        <Option label="Close" handler={() => {
                        setModalVisible(!modalVisible);
                        }} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>

    return (
        <>
            <TouchableOpacity className='flex-row flex space-x-1 bg-gray-300 rounded-lg p-2 ml-1 mt-1' onPress={() => setModalVisible(true)}>
                <Text>...</Text> 
            </TouchableOpacity> 
            {modalVisible ? modal : <></>}
        </>
    )
}
