import { useState } from "react";
import { Modal, View, Image, TouchableOpacity } from "react-native";
import Option from "./items/Option";
import { PostOptionsProps } from "../types/PostOptions";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { StackParams } from "../types/Navigator";

export default function PostOptions(props: PostOptionsProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <>
            <TouchableOpacity
                className="mr-2 mt-2 mb-2"
                onPress={() => setModalVisible(true)}>
                <Image className="w-6 h-6" source={require('../assets/icons/options.png')} />
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
                        <View className="bg-white w-full p-1 flex items-center pt-1 pb-10 rounded-lg">
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
                            <Option label={props.author} handler={() => {
                                setModalVisible(!modalVisible);
                                navigation.navigate('Overview', { data: props.author })
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
