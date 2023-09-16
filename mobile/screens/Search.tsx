import { View, ScrollView, ActivityIndicator } from 'react-native';
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

  useEffect(() => {
    navigation.setOptions({
      title: 'Communities',
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
    return <Community key={item.id} {...item } />
  })

  return (
    <View className='flex flex-1 justify-center items-center'>
      <ScrollView className='flex w-screen'>
        {communities}
      </ScrollView>
    </View>
  );
}