import { Text, View } from 'react-native';

export default function NoPostsFound() {
  return (
    <View className='bg-white p-5 rounded-full mt-5'>
      <Text>
        No post in this community yet.
      </Text>
    </View>
  );
}
