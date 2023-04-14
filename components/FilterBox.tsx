import { useState } from "react";
import { Modal, Text, View, Image, TouchableOpacity } from "react-native";
import { FilterBoxProps } from "../types/FilterBox";
import Option from "./items/Option";

export default function FilterBox(props: FilterBoxProps) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity
                className="mr-2 mt-2 mb-2"
                onPress={() => setModalVisible(true)}>
                <Image className="w-7 h-7" source={require('../assets/icons/filter.png')} />
            </TouchableOpacity>
            <View className="flex flex-1">
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View className="flex flex-1 justify-end items-center">
                        <View className="bg-white w-full p-1 flex items-center pt-3 pb-10 rounded-lg">
                            <Text className="pb-3">Sort by...</Text>
                            <Option icon="best" label="Best" handler={() => {
                                props.data.setFilter('best');
                                setModalVisible(!modalVisible);
                            }} />
                            <Option icon="hot" label="Hot" handler={() => {
                                props.data.setFilter('hot');
                                setModalVisible(!modalVisible);
                            }} />
                            <Option icon="convtroversial" label="Controversial" handler={() => {
                                props.data.setFilter('controversial');
                                setModalVisible(!modalVisible);
                            }} />
                            <Option icon="top" label="Top" handler={() => {
                                props.data.setFilter('top');
                                setModalVisible(!modalVisible);
                            }} />
                            <Option icon="new" label="New" handler={() => {
                                props.data.setFilter('new');
                                setModalVisible(!modalVisible);
                            }} />
                            <Option label="Close" handler={() => {
                                setModalVisible(!modalVisible);
                            }} />
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    )
}
