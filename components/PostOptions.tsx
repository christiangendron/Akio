import { useState } from "react";
import { Modal, Text, Pressable, View, Image, TouchableOpacity } from "react-native";

export default function PostOption() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}>
                <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/options.png')} />
            </TouchableOpacity>
            <View className="flex flex-1 justify-center items-center">
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View className="flex flex-1 justify-center items-center">
                        <View className="flex flex-col bg-white p-10 rounded-lg justify-center items-center shadow-lg shadow-black">
                            <Text>Post options test</Text>
                            <Pressable
                                className="bg-primary rounded-lg p-2 mt-5"
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    )
}