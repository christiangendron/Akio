import React from 'react';
import { Dimensions, Image } from 'react-native';
import { FullScreenCompProps } from '../types/FullScreenComp';
import { decode } from 'html-entities';

export default function FullScreenComp(props: FullScreenCompProps) {
  const currentPost = props.data.data;

  let image = undefined;

  if (currentPost.preview && currentPost.preview.images) {
    const screenDimensions = Dimensions.get("screen");
    const imageThumb = decode(currentPost.preview.images[0].resolutions[2].url);
    const thumbHeight = currentPost.preview.images[0].resolutions[2].height;
    image = <Image style={{ resizeMode: 'cover', width: screenDimensions.width, height: thumbHeight }} source={{ uri: imageThumb }} />;
  }

  return (
    <>
      {image}
    </>
  );
};