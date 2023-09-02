import { Text, View } from 'react-native';

export default function NoPostsFound() {
  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text>
        No posts found with that keyword.
      </Text>
    </View>
  );
}
