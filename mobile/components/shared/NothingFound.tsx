import { Text, View } from 'react-native';

interface NothingFoundProps {
  type: string;
}

export default function NothingFound(props: NothingFoundProps) {
  return (
    <View className='rounded-lg m-2 bg-white'>
      <Text className='text-center p-5'>
        No {props.type} found
      </Text>
    </View>
  );
}
