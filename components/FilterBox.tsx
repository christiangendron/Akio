import { useState } from "react";
import { Modal, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
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
                    <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                        <View className="flex flex-1 justify-end items-center">
                            <View className="bg-slate-300 w-full p-1 flex items-center pt-1 pb-10 rounded-lg">
                                <Option icon={true} label="Best" filter={props.filter.current} selectable={true} handler={() => {
                                    props.filter.current = 'best'
                                    setModalVisible(!modalVisible);
                                    props.refetch();
                                }} />
                                <Option icon={true} label="Hot" filter={props.filter.current} selectable={true} handler={() => {
                                    props.filter.current = 'hot';
                                    setModalVisible(!modalVisible);
                                    props.refetch();
                                }} />
                                <Option icon={true} filter={props.filter.current} label="Controversial" selectable={true} handler={() => {
                                    props.filter.current = 'controversial'
                                    setModalVisible(!modalVisible);
                                    props.refetch();
                                }} />
                                <Option icon={true} label="Top" filter={props.filter.current} selectable={true} handler={() => {
                                    props.filter.current = 'top'
                                    setModalVisible(!modalVisible);
                                    props.refetch();
                                }} />
                                <Option icon={true} label="New" filter={props.filter.current} selectable={true} handler={() => {
                                    props.filter.current = 'new'
                                    setModalVisible(!modalVisible);
                                    props.refetch();
                                }} />
                                <Option label="Close" handler={() => {
                                    setModalVisible(!modalVisible);
                                }} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </>
    )
}
