import { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import Modal from "react-native-modal";
import CustomInput from "../shared/CustomInput";
import GenerateButton from "../shared/GenerateButton";
import { AuthContext } from "../../context/AuthContext";
import NotAuth from "../account/NotAuth";
import { Ionicons } from '@expo/vector-icons'; 
import { useColorScheme } from "nativewind";

type CustomModalProps = {
    type: string;
    id: number;
    keyToInvalidate: string;
}

export default function GenerateModal(props: CustomModalProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [inspiration, setInspiration] = useState('');
    const [withImage, setWithImage] = useState(false);
    const authContext = useContext(AuthContext);
    const { colorScheme } = useColorScheme();

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const withImageOption = <View className='flex flex-grow w-full flex-row bg-secondary dark:bg-secondaryDark p-3 justify-between items-center mb-1 rounded-lg'>
        <View>
            <Text className='dark:text-white'>Generate with an image</Text>
            <Text className='text-xsm text-gray-400'>Takes much longer...</Text>
        </View>
        <Switch value={withImage} onValueChange={() => setWithImage(!withImage)}/>
    </View>

    const modalContent = <View className="bg-background dark:bg-backgroundDark rounded-lg flex items-center p-2">
        <Text className='text-lg my-3 font-semibold dark:text-white'>Generate a {props.type}</Text>
        <CustomInput 
            placeholder='Inspiration for the generation (optional)' 
            onChangeText={setInspiration} 
            value={inspiration} 
            isError={false}
            extraStyles="rounded-lg bg-secondary dark:bg-secondaryDark dark:text-white"
         />
        {props.type !== 'comment' ? withImageOption : null}
        <GenerateButton 
            id={props.id} 
            type={props.type} 
            inspiration={inspiration} 
            onComplete={toggleModal}
            with_image={withImage} 
            keyToInvalidate={props.keyToInvalidate}
        />
    </View>

    return (
       <>
            <TouchableOpacity onPress={toggleModal} className="mr-3">
                <Ionicons name="create-outline" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
            </TouchableOpacity>
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
