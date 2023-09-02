import { View, Text, ScrollView } from 'react-native';
import Subreddit from '../components/items/Subreddit';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppTheme from '../styles/AppTheme';

export default function Search() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Search',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
    });
  }, [navigation]);

  return (
    <View className='flex flex-1 justify-center items-center'>
      <ScrollView className='flex w-full'>
        <Text className='text-lg ml-3'>Popular subreddits</Text>
        <Subreddit />
        <Subreddit />
        <Subreddit />
        <Subreddit />
        <Subreddit />
      </ScrollView>
    </View>
  );
}