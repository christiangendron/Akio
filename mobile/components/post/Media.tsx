import { Image } from 'react-native';
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageView from "react-native-image-viewing";

type MediaProps = {
    media_url: string;
}

export default function Media(props: MediaProps) {
    const backendUrl = process.env.BACKEND_IMAGE_URL;
    const [visible, setVisible] = React.useState(false);

    const images = [
        {
          uri: backendUrl + props.media_url,
        }
    ];

    if (visible) return (
        <ImageView images={images} imageIndex={0} visible={visible} onRequestClose={() => setVisible(false)}/>
    )

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)}>
            <Image source={{ uri: backendUrl + props.media_url }} className='h-96 bg-gray-400 mb-2' />
        </TouchableOpacity>
    )
}