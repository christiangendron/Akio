import { useColorScheme } from 'nativewind';
import React from 'react'
import { ActivityIndicator } from 'react-native'

function CustomActivityIndicator() {
  const { colorScheme } = useColorScheme();

  return (
    <ActivityIndicator color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
  )
}

export default CustomActivityIndicator