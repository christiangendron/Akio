import { useContext, useState } from "react";
import { View } from "react-native";
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

export default function PostOptionsModal(props: PostOptionsProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const authContext = useContext(AuthContext);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setShowContent(!showContent);
    }

    const deleteMutation = useDeleteItemMutation(props.keyToInvalidate);

    const deleteOption = <Option label="Delete" handler={() => {deleteMutation.mutate({ id: props.id, type: "post" });setModalVisible(!modalVisible);}} />

    const modalContent = <View className="bg-secondary dark:bg-secondaryDark rounded-lg flex items-center p-2">
        <Option label={`In ${props.community}`} handler={() => {
        toggleModal();
        navigation.push('Community', { id: props.community_id, name: props.community })
        }} />
        <Option label={`By ${props.username}`} handler={() => {
        toggleModal();
        navigation.navigate('Overview', { id: props.user_id, name: props.username })
        }} />
        {authContext.canDelete(props.user_id) ? deleteOption : null}
        <Option label="Close" handler={toggleModal} />
    </View>

    return (
        <>
             <Pill text='...' handler={toggleModal} />
             <Modal
                 isVisible={modalVisible}
                 animationIn="slideInUp"
                 animationOut="slideOutDown"
                 onBackdropPress={toggleModal}
                 avoidKeyboard={true}
                 useNativeDriver={true}
                 hideModalContentWhileAnimating={true}
             >
                {modalContent}
             </Modal>
         </>
     );
}