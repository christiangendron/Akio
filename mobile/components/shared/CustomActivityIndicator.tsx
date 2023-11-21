import { useColorScheme } from 'nativewind';
import React from 'react'
import { ActivityIndicator } from 'react-native'

/**
 * CustomActivityIndicator : used to display a custom activity indicator (color depends on the color scheme).
 * @returns JSX.Element
 */
function CustomActivityIndicator() {
  const { colorScheme } = useColorScheme();

  return (
    <ActivityIndicator color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
  )
}

export default CustomActivityIndicator