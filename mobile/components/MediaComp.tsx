import React, { useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { decode } from 'html-entities';
import { Video, ResizeMode } from 'expo-av';
import { MediaCompProps } from '../types/MediaComp';
import ImageView from "react-native-image-viewing";

export default function MediaComp(props: MediaCompProps) {
  const currentPost = props.data.data;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [visible, setIsVisible] = useState(false);

  let content = undefined;

  if (currentPost.is_video) {
    const videoURI = currentPost.media.reddit_video.fallback_url;
    const { width, height } = currentPost.media.reddit_video;
    // Calculate the aspect ratio of the video
    const aspectRatio = width / height;

     // Calculate the height of the video based on the aspect ratio and the width of the device screen
    const videoHeight = Dimensions.get('window').width / aspectRatio;

    content = <Video
      ref={video}
      source={{ uri: videoURI }}
      useNativeControls
      shouldPlay
      resizeMode={ResizeMode.CONTAIN}
      style={{ width: Dimensions.get('window').width, height: videoHeight }}
      isLooping
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />;
  } else if (currentPost.is_gallery) {
      const images = currentPost.gallery_data.items.map((item) => {
        return {
          uri: `https://i.redd.it/${item.media_id}.png`,
        };
     });

      content = (
        <View>
            <ImageView
              images={images}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
        </View>
        
      )
  } else if (currentPost.preview && currentPost.preview.images) {
    const imageURI = decode(currentPost.preview.images[0].source.url);
    const { width, height } = currentPost.preview.images[0].source;
  
    // Calculate the aspect ratio of the image
    const aspectRatio = width / height;
  
    // Calculate the height of the image based on the aspect ratio and the width of the device screen
    const imageHeight = Dimensions.get('window').width / aspectRatio;
  
    // Renders the image with the specified properties
    content = <Image source={{ uri: imageURI }} style={{ width: Dimensions.get('window').width, height: imageHeight, resizeMode: 'contain' }} />;

  }


  return (
    <>
      {content}
    </>
  );
};