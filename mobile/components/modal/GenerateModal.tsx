import { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import CustomInput from "../shared/CustomInput";
import { AuthContext } from "../../context/AuthContext";
import NotAuth from "../account/NotAuth";
import { Ionicons } from '@expo/vector-icons'; 
import { useColorScheme } from "nativewind";
import useGenerateMutation from "../../hooks/useGenerateMutation";
import CustomButton from "../shared/CustomButton";
import Icon from "../shared/Icon";
import MenuItem from "../items/MenuItem";
import { AxiosError } from "axios";
import Generating from "../shared/Generating";

type CustomModalProps = {
    type: string;
    id: number;
    keyToInvalidate: string;
}

export type GenerateVariables = {
    type: string;
    parent_id?: number;
    inspiration: string;
    with_image: boolean;
    model?: string;
}

/**
 * Generate modal : used to generate a post/comment/community.
 * @param props CustomModalProps
 * @returns JSX.Element
 */
export default function GenerateModal(props: CustomModalProps) {
    const mutation = useGenerateMutation();
    const [modalVisible, setModalVisible] = useState(false);
    const [inspiration, setInspiration] = useState('');
    const [withImage, setWithImage] = useState(false);
    const authContext = useContext(AuthContext);
    const { colorScheme } = useColorScheme();
    const [taskId, setTaskId] = useState<number|null>(null);

    const variables = {
        type: props.type.includes('post') ? 'post' : props.type,
        parent_id: props.id,
        inspiration: inspiration,
        with_image: withImage,
        model: 'dall-e-3'
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }
    
    useEffect(() => {
        if (mutation.isSuccess && modalVisible) {
            setTaskId(mutation.data.id);
            setInspiration('');
            setWithImage(false);
        }
    }, [mutation.isSuccess]);

    const clearTask = () => {
        setTaskId(null);
        mutation.reset();

        // wait 300ms for before closing the modal
        // makes the animation smoother
        setTimeout(() => {
            toggleModal();
        }, 300);
    };

    let buttonLabel = 'Generate';

	const error = (mutation.error as AxiosError<{ message: string }>)?.response?.data?.message;

    if (mutation.error) {
        buttonLabel = error ?? 'Server is not responding';
    }

    const imageSwitch = <MenuItem 
        withSwitch={true} 
        label='With image' 
        subLabel="Takes much longer..." 
        current={withImage} 
        handler={() => setWithImage(!withImage)} 
        disabled={mutation.isLoading} 
        extraStyles="mt-1"
    />

    let modalContent = null;

    if (!taskId) {
        modalContent = <View className="w-full bg-background dark:bg-backgroundDark rounded-lg flex items-center p-2">
            <Text className='text-lg my-3 font-semibold dark:text-white'>
                Generate a {props.type.includes('post') ? 'post' : props.type}
            </Text>
            <View className="w-full">
                <CustomInput 
                    placeholder='Optional inspiration for the generation...' 
                    onChangeText={setInspiration} 
                    value={inspiration} 
                    isError={false}
                    extraStyles="rounded-lg bg-secondary dark:bg-secondaryDark dark:text-white"
                    disabled={mutation.isLoading} />
                {props.type !== 'comment' ? imageSwitch : null}
            </View>
            <CustomButton 
                label={buttonLabel} 
                handler={() => mutation.mutate(variables)} 
                isLoading={mutation.isLoading} 
                extraStyles=" mt-2" />
        </View>
    } else {
        modalContent = <Generating 
            task_id={taskId} 
            keyToInvalidate={props.keyToInvalidate} 
            clear={() => clearTask()}
        />;
    }

    return (
       <>
            <Icon 
                icon={mutation.isError ? 
                    <Ionicons name="warning-outline" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} /> : 
                    <Ionicons name="create-outline" size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />} 
                handler={toggleModal} 
                isLoading={mutation.isLoading}
                extraStyles='mr-3' />
            <Modal
                isVisible={modalVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={toggleModal}
                avoidKeyboard={true}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true} >
                {authContext.isAuth ? modalContent : <NotAuth closeModal={toggleModal}/>}
            </Modal>
        </>
    );
}
