import { Text, View } from 'react-native';
import { NothingFoundProps } from '../types/NothingFound';

export default function NothingFound(props: NothingFoundProps) {
  return (
    <View className='p-5 w-screen'>
      <Text className='text-center'>
        No {props.type} found... yet
      </Text>
    </View>
  );
}
