
import { View, Text } from 'react-native';
import { DetailsScreenProps } from '../types/Details';

export default function Details(props: DetailsScreenProps) {
  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text>Comments</Text>
    </View>
  );
}