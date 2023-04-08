import React from 'react';
import { Dimensions, Image, Text } from 'react-native';
import { FullScreenCompProps } from '../types/FullScreenComp';
import { decode } from 'html-entities';

export default function FullScreenComp(props: FullScreenCompProps) {
  const currentPost = props.data.data;

  let image = null;
  
  try {
      if (currentPost.secure_media == null) {
          const screenDimensions = Dimensions.get("screen");
          const imageThumb = decode(currentPost.preview.images[0].resolutions[2].url);
          const thumbHeight = currentPost.preview.images[0].resolutions[2].height;
          const thumbwidth = currentPost.preview.images[0].resolutions[2].width;
          const source = decode(currentPost.preview.images[0].source.url);
          image = <Image style={{ resizeMode: 'cover', width: screenDimensions.width, height: thumbHeight }} source={{ uri: imageThumb }} />;
      }
  } catch (error) {
      console.log('Post with id: ' + currentPost.id + ' caused an error');
  }

  return (
    <>
    {image}
    </>
  );
};