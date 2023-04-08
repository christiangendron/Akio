import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Image, Text, TouchableOpacity, StatusBar } from 'react-native';
import Video from 'react-native-video';
import { FullScreenCompProps } from '../types/FullScreenComp';

export default function FullScreenComp(props: FullScreenCompProps) {
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <View className=''>
      <Image source={props.source} className='h-100' />
    </View>
  );
};