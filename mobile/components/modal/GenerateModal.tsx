import { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import CustomInput from "../shared/CustomInput";
import { AuthContext } from "../../context/AuthContext";
import NotAuth from "../account/NotAuth";
import { Ionicons } from '@expo/vector-icons'; 
import { useColorScheme } from "nativewind";
import useGenerateMutation from "../../hooks/useGenerateMutation";
import CustomButton from "../shared/CustomButton";
import Icon from "../shared/Icon";

type CustomModalProps = {
    type: string;
    id: number;
    keyToInvalidate: string;
}

export default function GenerateModal(props: CustomModalProps) {
    const mutation = useGenerateMutation(props.keyToInvalidate);
    const [modalVisible, setModalVisible] = useState(false);
    const [inspiration, setInspiration] = useState('');
    const [withImage, setWithImage] = useState(false);
    const authContext = useContext(AuthContext);
    const { colorScheme } = useColorScheme();

    const variables = {
        id: props.id,
        type: props.type,
        inspiration: inspiration,
        with_image: withImage,
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    useEffect(() => {
        if (mutation.isSuccess && modalVisible) {
            toggleModal()
            setInspiration('');
            setWithImage(false);
        }
    }, [mutation.isSuccess]);

    const withImageOption = <View className='flex flex-grow w-full flex-row bg-secondary dark:bg-secondaryDark p-3 justify-between items-center mb-1 rounded-lg'>
        <View>
            <Text className='dark:text-white'>Generate with an image</Text>
            <Text className='text-xsm text-gray-400'>Takes much longer...</Text>
        </View>
        <Switch value={withImage} onValueChange={() => setWithImage(!withImage)} disabled={mutation.isLoading}/>
    </View>

    let buttonLabel = 'Generate';

    if (mutation.error instanceof Error) {
        buttonLabel = (mutation.error as any).response?.data?.message + ' ↺';
    }

    const modalContent = <View className="bg-background dark:bg-backgroundDark rounded-lg flex items-center p-2">
        <Text className='text-lg my-3 font-semibold dark:text-white'>Generate a {props.type}</Text>
        <CustomInput 
            placeholder='Optional inspiration for the generation...' 
            onChangeText={setInspiration} 
            value={inspiration} 
            isError={false}
            extraStyles="rounded-lg bg-secondary dark:bg-secondaryDark dark:text-white"
            disabled={mutation.isLoading}
         />
        {props.type !== 'comment' ? withImageOption : null}
        <CustomButton label={buttonLabel} handler={() => mutation.mutate(variables)} extraStyles='mt-3' isLoading={mutation.isLoading} />
    </View>

    return (
       <>
            <Icon 
                icon={<Ionicons name="create-outline" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />} 
                handler={toggleModal} 
                isLoading={mutation.isLoading}
                extraStyles='mr-3'
            />
            <Modal
                isVisible={modalVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={toggleModal}
                avoidKeyboard={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
            >
                {authContext.isAuth ? modalContent: <NotAuth closeModal={toggleModal}/>}
            </Modal>
        </>
    );
}
