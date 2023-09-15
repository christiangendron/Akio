import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Subreddit from '../components/items/Community';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppTheme from '../styles/AppTheme';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import Community from '../components/items/Community';
import ErrorMessage from '../components/ErrorMessage';

export default function Search() {
  const navigation = useNavigation();

  const query = useQuery({
    queryKey: ['community-list'],
    queryFn: () => AkioServices.getCommunities(),
  });

  console.log(query.data)

  useEffect(() => {
    navigation.setOptions({
      title: 'Search',
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
    });
  }, [navigation]);

  if (query.isLoading) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ActivityIndicator />
      </View>
    );
  }

  if (query.isError) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ErrorMessage message="Error while getting communities." action={query.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const communities = query.data?.map((item)=> {
    return <Community {...item } />
  })

  return (
    <View className='flex flex-1 justify-center items-center'>
      <ScrollView className='flex w-full'>
        <Text className='text-lg ml-3'>Popular communities</Text>
        {communities}
      </ScrollView>
    </View>
  );
}