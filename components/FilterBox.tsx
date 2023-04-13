import { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from "react-native";
import { FilterBoxProps } from "../types/FilterBox";

export default function FilterBox(props: FilterBoxProps) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity
                style={{ marginRight: 15, marginTop: 15, marginBottom: 15 }}
                onPress={() => setModalVisible(true)}>
                <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/filter.png')} />
            </TouchableOpacity>
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.title}>Sort by...</Text>
                            <Text style={styles.modalText} onPress={() => {
                                props.data.setFilter('best');
                                setModalVisible(!modalVisible);
                            }}>Best</Text>
                            <Text style={styles.modalText} onPress={() => {
                                props.data.setFilter('hot');
                                setModalVisible(!modalVisible);
                            }}>Hot</Text>
                            <Text style={styles.modalText} onPress={() => {
                                props.data.setFilter('top')
                                setModalVisible(!modalVisible);
                            }}>Top</Text>
                            <Text style={styles.modalText} onPress={() => {
                                props.data.setFilter('new');
                                setModalVisible(!modalVisible);
                            }}>New</Text>
                        </View>
                        <View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
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