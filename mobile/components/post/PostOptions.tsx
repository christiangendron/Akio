import { useContext, useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import Option from "../items/Option";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { StackParams } from "../../types/Navigator";
import Pill from "../items/Pill";
import { AuthContext } from "../../context/AuthContext";
import useDeleteItemMutation from "../../hooks/useDeleteItem";
import Modal from "react-native-modal";

interface PostOptionsProps {
    id: number;
    username: string;
    user_id: number;
    community: string;
    community_id: number;
    keyToInvalidate: string;
}

export default function PostOptions(props: PostOptionsProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const authContext = useContext(AuthContext);

    const deleteMutation = useDeleteItemMutation(props.keyToInvalidate);

    const deleteOption = <Option label="Delete" handler={() => {deleteMutation.mutate({ id: props.id, type: "post" });setModalVisible(!modalVisible);}} />
    const modal = 
        <View className="flex flex-1">
            <Modal
                isVisible={true}
                animationIn="slideInUp"
                animationOut="slideOutDown"
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                        <View className="bg-white w-full p-1 flex items-center rounded-lg">
                        <Option label={`In ${props.community}`} handler={() => {
                        setModalVisible(!modalVisible);
                        navigation.push('Community', { id: props.community_id, name: props.community })
                        }} />
                        <Option label={`By ${props.username}`} handler={() => {
                        setModalVisible(!modalVisible);
                        navigation.navigate('Overview', { id: props.user_id, name: props.username })
                        }} />
                        {authContext.canDelete(props.user_id) ? deleteOption : null}
                        <Option label="Close" handler={() => {
                        setModalVisible(!modalVisible);
                        }} />
                        </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>

    return (
        <>
            <Pill text='...' handler={() => setModalVisible(true)} />
            {modalVisible ? modal : <></>}
        </>
    )
}
