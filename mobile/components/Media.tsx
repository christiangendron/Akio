import { Image, Text, View } from 'react-native';
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modal } from 'react-native';

type MediaProps = {
    media_url: string;
}

export default function Media(props: MediaProps) {
    const backendUrl = process.env.BACKEND_IMAGE_URL;
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <>
            <Modal visible={modalVisible} transparent={true}>
                <View className='flex flex-1 bg-black justify-center'>
                    <Image source={{ uri: backendUrl + props.media_url }} className='h-96 bg-gray-400 mb-2' />
                    <TouchableOpacity onPress={() => setModalVisible(modalVisible => !modalVisible)}>
                        <Text className='text-white text-center text-lg m-5'>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(modalVisible => !modalVisible)}>
                <Image source={{ uri: backendUrl + props.media_url }} className='h-96 bg-gray-400 mb-2' />
            </TouchableOpacity>
        </>
        
    )
}