import { useState } from "react";
import { Modal, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { ControlPanelProps } from "../types/ControlPanelProps";
import Option from "./items/Option";

export default function ControlPanel(props: ControlPanelProps) {
    const [modalVisible, setModalVisible] = useState(false);

    if (props.id === 0) return (<></>);
    
    const modal = 
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                <View className="flex flex-1 justify-end items-center">
                    <View className="bg-gray-300 w-full p-1 flex items-center pt-1 pb-10 rounded-lg">
                        <Option label="Generate content" handler={() => {
                        setModalVisible(!modalVisible);
                        }} />
                        <Option label="Close" handler={() => {
                        setModalVisible(!modalVisible);
                        }} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>;

    return (
        <>
            <TouchableOpacity className="mr-2 mt-2 mb-2" onPress={() => setModalVisible(true)}>
                <Image className="w-7 h-7" source={require('../assets/icons/filter.png')} />
            </TouchableOpacity>
            {modalVisible ? modal : <></>}
        </>
    )
}
