import React from 'react';
import { Dimensions, Image } from 'react-native';
import { FullScreenCompProps } from '../types/FullScreenComp';
import { decode } from 'html-entities';

export default function FullScreenComp(props: FullScreenCompProps) {
  const currentPost = props.data.data;

  let image = undefined;

  if (currentPost.preview && currentPost.preview.images) {
    const imageURI = decode(currentPost.preview.images[0].source.url);
    const { width, height } = currentPost.preview.images[0].source;
  
    // Calculate the aspect ratio of the image
    const aspectRatio = width / height;
  
    // Calculate the height of the image based on the aspect ratio and the width of the device screen
    const imageHeight = Dimensions.get('window').width / aspectRatio;
  
    // Renders the image with the specified properties
    image = <Image 
      source={{ uri: imageURI }} 
      style={{ width: Dimensions.get('window').width, height: imageHeight, resizeMode: 'contain' }} 
    />;
  }

  return (
    <>
      {image}
    </>
  );
};