import { Text, View } from 'react-native';

interface NothingFoundProps {
  type: string;
}

export default function NothingFound(props: NothingFoundProps) {
  return (
    <View className='w-screen'>
      <Text className='text-center bg-white p-5'>
        No {props.type} found
      </Text>
    </View>
  );
}
