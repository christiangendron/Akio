import { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from "react-native";
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
                        <View className="bg-white w-full p-1 flex items-center py-10 rounded-lg">
                            <Text style={styles.title}>Sort by...</Text>
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

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        width: '75%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        width: '50%',
        elevation: 2
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        decorationLine: 'underline',
        marginBottom: 15,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    }
});