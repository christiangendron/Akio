import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { OverviewProps } from '../types/Overview';
import { useQuery } from 'react-query';
import AkioServices from '../services/AkioServices';
import ErrorMessage from '../components/ErrorMessage';
import Post from '../components/items/Post';
import { PostProps } from '../types/Post';
import NoPostsFound from '../components/NoPostsFound';
import AppTheme from '../styles/AppTheme';

export default function Overview(props: OverviewProps) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: props.route.params.name,
      headerStyle: {
        backgroundColor: AppTheme.lightgray
      },
      headerTintColor: AppTheme.black,
    });
  }, [navigation]);

  const query = useQuery({
    queryKey: ['posts', props.route.params.id],
    queryFn: () => AkioServices.getUserPosts(props.route.params.id),
  });

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
        <ErrorMessage message="Error while getting posts." action={query.refetch} actionMessage="Try again!" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: PostProps }): JSX.Element => {
    return <Post key={item.id} {...item} />;
  };

  return (
    <View className='flex flex-1 justify-center items-center'>
      <FlatList
        data={query.data}
        renderItem={renderItem}
        refreshing={query.isLoading}
        ItemSeparatorComponent={() => <View className='h-4' />}
        onRefresh={query.refetch}
        onEndReachedThreshold={2}
        ListHeaderComponent={<View className='mt-2'/>}
        ListEmptyComponent={<NoPostsFound />}
      />
    </View>
  );
}