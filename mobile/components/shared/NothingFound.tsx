import { Text, View } from 'react-native';

interface NothingFoundProps {
  type: string;
}

export default function NothingFound(props: NothingFoundProps) {
  return (
    <View className='rounded-lg m-2 bg-secondary dark:bg-secondaryDark'>
      <Text className='text-center p-5 dark:text-white'>
        No {props.type} found
      </Text>
    </View>
  );
}
