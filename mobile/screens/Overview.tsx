import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import ErrorMessage from '../components/ErrorMessage';
import RedditServices from '../services/RedditServices';
import { OverviewProps } from '../types/Overview';

export default function Overview(props: OverviewProps) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: props.route.params.data,
    });
  }, [navigation]);

  const user = useQuery(`overview-for-${props.route.params.data}`, () => RedditServices.getOverview(props.route.params.data));

  if (user.isLoading) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ActivityIndicator />
      </View>
    );
  }

  if (user.isError) {
    return (
      <View className='flex flex-1 justify-center items-center'>
        <ErrorMessage message="Error while getting user info." action={user.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const currentUserInfo = user?.data?.data.data.children[0].data;

  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text>Overview for {currentUserInfo.author}</Text>
    </View>
  );
}
