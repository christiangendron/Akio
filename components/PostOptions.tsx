import { useState } from "react";
import { Modal, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Option from "./items/Option";
import { PostOptionsProps } from "../types/PostOptions";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { StackParams } from "../types/Navigator";

export default function PostOptions(props: PostOptionsProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    const modal = <View className="flex flex-1">
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
                <View className="bg-slate-300 w-full p-1 flex items-center pb-10 rounded-lg">
                    <Option label="Upvote" handler={() => {
                        setModalVisible(!modalVisible);
                    }} />
                    <Option label="Downvote" handler={() => {
                        setModalVisible(!modalVisible);
                    }} />
                    <Option label="Save" handler={() => {
                        setModalVisible(!modalVisible);
                    }} />
                    <Option label={`r/${props.subreddit}`} handler={() => {
                        setModalVisible(!modalVisible);
                        navigation.push('Subreddit', { data: props.subreddit })
                    }} />
                    <Option label={'u/' + props.author} handler={() => {
                        setModalVisible(!modalVisible);
                        navigation.navigate('Overview', { data: props.author })
                    }} />
                    <Option label="Close" handler={() => {
                        setModalVisible(!modalVisible);
                    }} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
</View>
    return (
        <>
            <TouchableOpacity
                className="p-2"
                onPress={() => setModalVisible(true)}>
                <Image className="w-5 h-5" source={require('../assets/icons/options.png')} />
            </TouchableOpacity>
            {modalVisible ? modal : <></>}
        </>
    )
}
