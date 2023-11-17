import { useState } from "react";
import { View, Text } from "react-native";
import Option from "../items/Option";
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons'; 
import Icon from "../shared/Icon";
import { useColorScheme } from "nativewind";

interface OrderByModalProps {
    current: string;
    setOrderBy: (value:string) => void;
}

export default function OrderByModal(props: OrderByModalProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const { colorScheme } = useColorScheme();

    const [current, setCurrent] = useState(props.current);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setShowContent(!showContent);
    }

    const setOrder = (value: string) => {
        setCurrent(value);
        props.setOrderBy(value);
        toggleModal();
    }

    const modalContent = <View className="bg-secondary dark:bg-secondaryDark rounded-lg flex items-center p-2">
        <Text className='text-lg my-3 font-semibold dark:text-white'>Order by</Text>
        <Option label={`New`} handler={() => setOrder('new')} selected={current === 'new'}/>
        <Option label={`Old`} handler={() => setOrder('old')} selected={current === 'old'}/>
    </View>

    return (
        <>
             <Icon 
                icon={<Ionicons name="list" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />} 
                handler={toggleModal} 
                extraStyles='mr-3' />
             <Modal
                 isVisible={modalVisible}
                 animationIn="slideInUp"
                 animationOut="slideOutDown"
                 onBackdropPress={toggleModal}
                 avoidKeyboard={true}
                 useNativeDriver={true}
                 hideModalContentWhileAnimating={true}>
                {modalContent}
             </Modal>
         </>
     );
}
